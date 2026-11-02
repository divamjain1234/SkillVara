const mongoose = require('mongoose')

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: { type: String }, // resume URL at the moment the candidate applied
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'hired'],
    default: 'applied',
  },
}, { timestamps: true })

// A candidate can apply to a given job only once.
ApplicationSchema.index({ job: 1, applicant: 1 }, { unique: true })

module.exports = mongoose.model('Application', ApplicationSchema)
