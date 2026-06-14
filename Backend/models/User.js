const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w.]+@(vitstudent\.ac\.in|vit\.ac\.in)$/, 'Only VIT email addresses are allowed']
  },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'mentor'], default: 'student' },

  // Common profile fields
  college: { type: String, default: 'VIT Vellore' },
  bio: { type: String },
  github: { type: String },
  linkedin: { type: String },
  portfolio: { type: String },
  interests: [String],

  // Student fields
  year: { type: Number },
  branch: { type: String },
  skills: [String],

  // Mentor fields
  achievements: [String],
  mentorAvailability: {
    type: String,
    enum: ['open', 'limited', 'unavailable'],
    default: 'open'
  },

}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);