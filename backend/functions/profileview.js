const userprofilemodel = require('../models/userprofile');

// Must run after isloggedin: a user can only view their own profile.
// Before, anyone could read any profile (phone, resume link...) by passing ?email=.
const profileview = async (req, res) => {
  try {
    const profile = await userprofilemodel.findOne({ email: req.user.email });
    if (!profile) {
      return res.status(404).send({ message: 'Profile not found' });
    }
    res.send({
      ...profile._doc,
      imageURL: profile.image || null,
      resumeURL: profile.resume || null,
      refrenceURL: profile.refrence || null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
};

module.exports = { profileview };
