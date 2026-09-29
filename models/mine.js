const mongoose = require('mongoose');

const mineSchema = new mongoose.Schema(
  {
    // ==================================================
    // MINE IDENTIFICATION
    // ==================================================

    mineCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    subsidiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subsidiary',
      required: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    // ==================================================
    // GEOGRAPHIC LOCATION
    // ==================================================

    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point',
      },

      coordinates: {
        type: [Number],
        required: true,

        validate: {
          validator: function (value) {
            return (
              value.length === 2 &&
              value[0] >= -180 &&
              value[0] <= 180 &&
              value[1] >= -90 &&
              value[1] <= 90
            );
          },

          message: 'Coordinates must be [longitude, latitude]',
        },
      },
    },

    // ==================================================
    // MINE TYPE
    // ==================================================

    mineType: {
      type: String,
      enum: ['opencast', 'underground', 'mixed'],
      required: true,
    },

    // ==================================================
    // AI RISK INFORMATION
    // ==================================================

    currentRiskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: null,
    },

    riskLevel: {
      type: String,
      enum: [
        'low',
        'medium',
        'high',
        'critical',
        'unrated',
      ],
      default: 'unrated',
    },

    riskLastUpdated: {
      type: Date,
      default: null,
    },

    // ==================================================
    // MINE STATUS
    // ==================================================

    status: {
      type: String,
      enum: [
        'active',
        'inactive',
        'under_review',
      ],
      default: 'active',
    },

    // ==================================================
    // ROLE ASSIGNMENTS
    // ==================================================

    // Corporate / Regulatory Officers
    assignedRegulatoryOfficers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // Primary Mine Manager
    assignedManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // Safety Officers
    assignedSafetyOfficers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // Field Inspectors
    assignedFieldInspectors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    // ==================================================
    // AUDIT
    // ==================================================

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Mine', mineSchema);