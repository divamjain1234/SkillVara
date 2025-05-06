const mongoose=require('mongoose')
const JobSchema = new mongoose.Schema({
  Title:{type:String},
  Salary:{type:String},
  Company:{type:String},
  Duration:{type:String},
  Jobtype:{type:String},
  Location:{type:String},
  },{ collection: 'Jobs' } ,{ timestamps: true });
  
  module.exports= mongoose.model("Job", JobSchema);
  