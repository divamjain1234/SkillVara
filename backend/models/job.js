const mongoose=require('mongoose')

// Field names keep their original capitalised style so existing documents in the
// "Jobs" collection keep working. New fields are all optional for the same reason.
const JobSchema = new mongoose.Schema({
  Title:{type:String},
  Salary:{type:String},
  Company:{type:String},
  Duration:{type:String},
  Jobtype:{type:String},
  Location:{type:String},
  Description:{type:String},
  Skills:{type:[String], default: []},
  postedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // employer who posted it
  isActive:{type:Boolean, default:true}, // employers can close a job
}, { collection: 'Jobs', timestamps: true }); // (options were split in two objects before, so timestamps never applied)

module.exports= mongoose.model("Job", JobSchema);
