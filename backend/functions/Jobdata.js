const Jobmodel=require('../models/job')
const Jobsdata=async(req,res)=>{
    let Jobs=await Jobmodel.find()
    // console.log(Jobs)
    res.status(201).json(Jobs)
}
module.exports={Jobsdata}