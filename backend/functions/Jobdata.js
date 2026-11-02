const Jobmodel=require('../models/job')

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

// GET /job/jobsdata?search=&location=&jobtype=&page=1&limit=12
// Returns { jobs, total, page, pages }. Closed jobs are hidden.
const Jobsdata=async(req,res)=>{
  try {
    const { search, location, jobtype } = req.query
    const page = Math.max(parseInt(req.query.page) || 1, 1)
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 12, 1), 50)

    const query = { isActive: { $ne: false } }
    const and = []
    if (typeof search === 'string' && search.trim()) {
      const rx = new RegExp(escapeRegex(search.trim()), 'i')
      and.push({ $or: [{ Title: rx }, { Company: rx }, { Skills: rx }, { Description: rx }] })
    }
    if (typeof location === 'string' && location.trim()) {
      query.Location = new RegExp(escapeRegex(location.trim()), 'i')
    }
    if (typeof jobtype === 'string' && jobtype.trim()) {
      query.Jobtype = new RegExp(escapeRegex(jobtype.trim()), 'i')
    }
    if (and.length) query.$and = and

    const [jobs, total] = await Promise.all([
      Jobmodel.find(query).sort({ createdAt: -1, _id: -1 }).skip((page - 1) * limit).limit(limit),
      Jobmodel.countDocuments(query),
    ])
    res.json({ jobs, total, page, pages: Math.max(Math.ceil(total / limit), 1) })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error' })
  }
}
module.exports={Jobsdata}
