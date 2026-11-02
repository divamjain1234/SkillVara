const mongoose=require('mongoose')
const Job=require('../models/job')
const Application=require('../models/application')
const UserProfile=require('../models/userprofile')

const str = (v) => (typeof v === 'string' ? v.trim() : '')

// POST /job/create  (employer)
const createjob=async(req,res)=>{
  try {
    const { Title, Salary, Duration, Jobtype, Location, Description } = req.body
    if(!str(Title) || !str(Description)){
      return res.status(400).json({message:'Title and description are required'})
    }
    let Skills = req.body.Skills
    if(typeof Skills === 'string') Skills = Skills.split(',')
    Skills = Array.isArray(Skills) ? Skills.map(s=>str(s)).filter(Boolean).slice(0,20) : []

    const job = await Job.create({
      Title:str(Title),
      Salary:str(Salary),
      Duration:str(Duration),
      Jobtype:str(Jobtype),
      Location:str(Location),
      Description:str(Description),
      Skills,
      Company:req.user.companyName, // always the employer's own company, never taken from the request
      postedBy:req.user._id,
    })
    res.status(201).json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}

// GET /job/mine  (employer) - own jobs with applicant counts
const myjobs=async(req,res)=>{
  try {
    const jobs = await Job.find({postedBy:req.user._id}).sort({createdAt:-1}).lean()
    const counts = await Application.aggregate([
      {$match:{job:{$in:jobs.map(j=>j._id)}}},
      {$group:{_id:'$job',count:{$sum:1}}},
    ])
    const map = new Map(counts.map(c=>[String(c._id),c.count]))
    res.json(jobs.map(j=>({...j,applicantCount:map.get(String(j._id))||0})))
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}

// Loads a job and makes sure it belongs to the logged-in employer.
const ownJob = async (req,res) => {
  if(!mongoose.isValidObjectId(req.params.id)){
    res.status(404).json({message:'Job not found'}); return null
  }
  const job = await Job.findById(req.params.id)
  if(!job){ res.status(404).json({message:'Job not found'}); return null }
  if(String(job.postedBy)!==String(req.user._id)){
    res.status(403).json({message:'This is not your job posting'}); return null
  }
  return job
}

// PATCH /job/:id/active  body {isActive:boolean}  (employer) - close or reopen a job
const setactive=async(req,res)=>{
  try {
    const job = await ownJob(req,res); if(!job) return
    job.isActive = !!req.body.isActive
    await job.save()
    res.json(job)
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}

// GET /job/:id/applicants  (employer)
const applicants=async(req,res)=>{
  try {
    const job = await ownJob(req,res); if(!job) return
    const apps = await Application.find({job:job._id}).sort({createdAt:-1})
      .populate('applicant','username email').lean()
    const profiles = await UserProfile.find({user:{$in:apps.map(a=>a.applicant?._id)}}).lean()
    const pmap = new Map(profiles.map(p=>[String(p.user),p]))
    res.json({
      job:{_id:job._id,Title:job.Title,Company:job.Company,isActive:job.isActive},
      applicants:apps.map(a=>{
        const p = pmap.get(String(a.applicant?._id)) || {}
        return {
          _id:a._id,
          status:a.status,
          appliedAt:a.createdAt,
          resume:a.resume || p.resume || null,
          username:a.applicant?.username,
          email:a.applicant?.email,
          phone:p.PhoneNo || null,
          skills:p.skills || [],
        }
      }),
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}

// PATCH /job/application/:appId/status  body {status}  (employer)
const updatestatus=async(req,res)=>{
  try {
    const { appId } = req.params
    const { status } = req.body
    if(!mongoose.isValidObjectId(appId)) return res.status(404).json({message:'Application not found'})
    if(!Application.schema.path('status').enumValues.includes(status)){
      return res.status(400).json({message:'Invalid status'})
    }
    const app = await Application.findById(appId).populate('job','postedBy')
    if(!app) return res.status(404).json({message:'Application not found'})
    if(String(app.job.postedBy)!==String(req.user._id)){
      return res.status(403).json({message:'Not your job posting'})
    }
    app.status = status
    await app.save()
    res.json({_id:app._id,status:app.status})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}

module.exports={createjob,myjobs,setactive,applicants,updatestatus}
