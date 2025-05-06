const jobmodel=require('../models/job')
const viewdetails=async(req,res)=>{
    try {
        let id=req.params.id
        console.log(id);
    let job=await jobmodel.findById(id)
    if(!job){
        return res.status(401).json('job not found')
    } 
     res.json(job)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
}
module.exports={viewdetails}