const userprofilemodel=require('../models/userprofile');
const createprofile=async (req,res)=>{
    let{email,phoneNo,degree,expyear,position,company,github,linkedin,jobtype,institution,startyear,finishyear,region,skills}=req.body;
    const image = req.files?.image?.[0]?.filename || "";
    const resume = req.files?.resume?.[0]?.filename || "";
    const refrence = req.files?.refrence?.[0]?.filename || "";
    console.log(req.files)
    console.log(req.body)
    let skillsArray = skills;
    if (typeof skills === 'string') {
      skillsArray = [skills];
    }
const experience={
    company,
    position,
    expyear
}
const education={
    institution: institution,
      degree: degree,
      startYear: startyear,
      endYear: finishyear
}
const links={
    linkedin:linkedin,
    github:github
}
const preferences={
    jobType:jobtype,
    location:region
}
    const profile =await userprofilemodel.findOneAndUpdate({email:email},{
        PhoneNo:phoneNo,
        experience:[experience],
        education:[education],
        socialLinks:[links],
        preferences:[preferences],
        skills:skillsArray,
        image,
        resume,
        refrence
        
      },{new:true})
}
module.exports={createprofile}