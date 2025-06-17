const userprofilemodel = require('../models/userprofile');

const createprofile = async (req, res) => {
  try {
    const {
      email,
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

    // ✅ Use .path instead of .filename for Cloudinary URLs
    const image = req.files?.image?.[0]?.path || "";
    const resume = req.files?.resume?.[0]?.path || "";
    const refrence = req.files?.refrence?.[0]?.path || "";

    let skillsArray = skills;
    if (typeof skills === 'string') {
      skillsArray = [skills];
    }

    const experience = { company, position, expyear };
    const education = { institution, degree, startYear: startyear, endYear: finishyear };
    const links = { linkedin, github };
    const preferences = { jobType: jobtype, location: region };

    const profile = await userprofilemodel.findOneAndUpdate(
      { email: email },
      {
        PhoneNo: phoneNo,
        experience: [experience],
        education: [education],
        socialLinks: [links],
        preferences: [preferences],
        skills: skillsArray,
        image, // ✅ cloudinary URL
        resume,
        refrence
      },
      { new: true, upsert: true } // upsert in case it's a first-time insert
    );

    res.status(200).json({
      message: 'Profile created/updated successfully',
      data: profile
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createprofile };
