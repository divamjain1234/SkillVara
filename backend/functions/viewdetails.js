const mongoose=require('mongoose')
const jobmodel=require('../models/job')
const applicationmodel=require('../models/application')

// GET /job/viewdetails/:id  (login optional: if logged in we also say whether you already applied)
const viewdetails=async(req,res)=>{
    try {
        const id=req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(404).json({message:'Job not found'})
        }
        const job=await jobmodel.findById(id)
        if(!job){
            return res.status(404).json({message:'Job not found'})
        }
        let hasApplied=false
        if(req.user && req.user.role==='candidate'){
            hasApplied=!!(await applicationmodel.exists({job:job._id,applicant:req.user._id}))
        }
        res.json({...job.toObject(),hasApplied})
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports={viewdetails}
