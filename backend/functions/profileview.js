const userprofilemodel = require('../models/userprofile');

const profileview = async (req, res) => {
  try {
    const useremail = req.query.email;
    const profile = await userprofilemodel.findOne({ email: useremail });
    if (!profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }
    // res.send(profile);
    const baseURL = `${req.protocol}://${req.get('host')}`;

    res.send({
      ...profile._doc,
      imageURL: profile.image ? `${baseURL}/images/${profile.image}` : null,
      resumeURL: profile.resume ? `${baseURL}/images/${profile.resume}` : null,
      refrenceURL: profile.refrence ? `${baseURL}/images/${profile.refrence}` : null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

module.exports = { profileview };
