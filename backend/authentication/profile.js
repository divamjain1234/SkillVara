const userprofilemodel = require('../models/userprofile');
const createprofile = async (req, res) => {
  console.log('FILES:', JSON.stringify(req.files, null, 2));
  try {
    const {
      phoneNo,
      degree,
      expyear,
      position,
      company,
      github,
      linkedin,
      jobtype,
      institution,
      startyear,
      finishyear,
      region,
      skills
    } = req.body;

    let skillsArray = skills;
    if (typeof skills === 'string') {
      skillsArray = [skills];
    }

    const experience = { company, position, expyear };
    const education = { institution, degree, startYear: startyear, endYear: finishyear };
    const links = { linkedin, github };
    const preferences = { jobType: jobtype, location: region };

    const update = {
      user: req.user._id,
      username: req.user.username,
      PhoneNo: phoneNo,
      experience: [experience],
      education: [education],
      socialLinks: [links],
      preferences: [preferences],
      skills: skillsArray,
    };
    const image = req.files?.image?.[0]?.path;
    const resume = req.files?.resume?.[0]?.path;
    const refrence = req.files?.refrence?.[0]?.path;
    if (image) update.image = image;
    if (resume) update.resume = resume;
    if (refrence) update.refrence = refrence;

    const profile = await userprofilemodel.findOneAndUpdate(
      { email: req.user.email },
      update,
      { new: true, upsert: true } // upsert in case it's a first-time insert
    );

    res.status(200).json({
      message: 'Profile created/updated successfully',
      data: profile
    });

  } catch (error) {
    console.error(SyntaxError);
console.error(JSON.stringify(err, null, 2));   
console.error(err.message, err.http_code);    
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createprofile };
