const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.]+@(vitstudent\.ac\.in|vit\.ac\.in)$/, 'Only VIT email addresses are allowed']
  },
  password: { type: String },
  authProvider: {
    type: String,
    enum: ['google', 'manual'],
    default: 'manual',
  },
  role: { type: String, enum: ['student', 'alumni'], default: 'student' },

  // Common profile fields
  college: { type: String, default: 'VIT Vellore' },
  bio: { type: String },
  github: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },
  interests: [String],
  profilePicture: { type: String, default: '' },
  domain: { type: String },

  // Student fields
  year: { type: Number },
  branch: { type: String },
  skills: [String],

  // Alumni fields
  achievements: [String],
  alumniAvailability: {
    type: String,
    enum: ['open', 'limited', 'unavailable'],
    default: 'open'
  },

  isVerified: { type: Boolean, default: false },

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
