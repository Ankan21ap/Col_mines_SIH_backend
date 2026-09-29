const mongoose = require('mongoose');

const subsidiarySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    // Short unique code, e.g. "ECL", "BCCL"
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    }
  }
);

module.exports = mongoose.model('Subsidiary', subsidiarySchema);