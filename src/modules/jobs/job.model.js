const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    salary: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
