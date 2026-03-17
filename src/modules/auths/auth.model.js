const mongoose = require('mongoose');
const { ROLES } = require('../../shared/utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.USER
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
