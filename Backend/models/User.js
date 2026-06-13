const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'mentor'], default: 'student' },
  skills: [String],
  bio: { type: String },
  year: { type: Number },
  branch: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);