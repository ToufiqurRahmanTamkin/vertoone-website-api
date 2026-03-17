const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    publishedAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
