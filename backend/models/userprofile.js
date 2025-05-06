const mongoose=require('mongoose')
const UserProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  username:{type:String},
  email:{type:String},
  PhoneNo:{type:String},
    resume: { type: String },
    refrence: { type: String },
    image:{type:String},
     skills: [String], // Array of skills
    preferences: [{
      jobType: { type: String },
      location: { type: String },
    }],
    experience: [{
      company: String,
      position: String,
      expyear:Number
    }],
    education: [{
      institution: String,
      degree: String,
      startYear: Number,
      endYear: Number
    }],
    socialLinks: [{
      linkedin: String,
      github: String,
    }],
  }, { timestamps: true });
  
  module.exports= mongoose.model("UserProfile", UserProfileSchema);
  