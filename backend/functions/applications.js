const mongoose=require('mongoose')
const Job=require('../models/job')
const Application=require('../models/application')
const UserProfile=require('../models/userprofile')

// POST /job/apply/:id  (candidate)
const apply=async(req,res)=>{
  try {
    if(!mongoose.isValidObjectId(req.params.id)) return res.status(404).json({message:'Job not found'})
    const job = await Job.findById(req.params.id)
    if(!job) return res.status(404).json({message:'Job not found'})
    if(job.isActive===false) return res.status(400).json({message:'This job is closed'})

    const profile = await UserProfile.findOne({user:req.user._id})
    if(!profile || !profile.resume){
      return res.status(400).json({message:'Please complete your profile and upload a resume before applying',code:'PROFILE_INCOMPLETE'})
    }
    await Application.create({job:job._id,applicant:req.user._id,resume:profile.resume})
    res.status(201).json({message:'Application sent to the employer'})
  } catch (error) {
    if(error.code===11000) return res.status(409).json({message:'You have already applied to this job'})
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}

// GET /job/applications/mine  (candidate)
const myapplications=async(req,res)=>{
  try {
    const apps = await Application.find({applicant:req.user._id}).sort({createdAt:-1})
      .populate('job','Title Company Location Salary isActive')
    res.json(apps.filter(a=>a.job).map(a=>({
      _id:a._id,status:a.status,appliedAt:a.createdAt,job:a.job,
    })))
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}
module.exports={apply,myapplications}
