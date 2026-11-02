const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  // Existing users have no role stored, so they default to candidate.
  role: { type: String, enum: ['candidate', 'employer'], default: 'candidate' },
  companyName: { type: String, trim: true }, // Only used for employers
  profileCompleted: { type: Boolean, default: false }, // Track if profile is completed
}, { timestamps: true });

module.exports=mongoose.model("User", UserSchema);
