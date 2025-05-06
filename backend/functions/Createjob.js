const Jobmodel=require('../models/job')
const Createjob=async(req,res)=>{
let newjob=await Jobmodel.create({
    Title:"web development",
    Salary:"20000$",
    Company:"abc.tld",
    Duration:"3 months",
    Jobtype:"remote type",
    Location:"delhi",
})
}
module.exports={Createjob}