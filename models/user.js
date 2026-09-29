const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const ROLES = [
  'system_admin',
  'field_inspector',
  'safety_officer',
  'mine_manager',
  'corporate_regulatory_officer',
];

const userSchema = new mongoose.Schema(
  {
    // Human-readable officer identifier
    // Example: DGMS-WB-0142
    officerId: {
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

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    role: {
      type: String,
      enum: ROLES,
      required: true,
    },

    // Primary subsidiary
    subsidiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subsidiary',
      default: null,
    },

    // Mines accessible to this user
    assignedMines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mine',
      },
    ],

    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },

    // Audit trail
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    // Useful for account security/audit
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);


// --------------------------------------------------
// Hash password before saving
// --------------------------------------------------

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});


// --------------------------------------------------
// Compare login password
// --------------------------------------------------

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


// --------------------------------------------------
// Export
// --------------------------------------------------

module.exports = mongoose.model('User', userSchema);
module.exports.ROLES = ROLES;