const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  name: { type: String },
  password: { type: String },
  role: { type: String, default: 'student' },
  createdAt: { type: Date, default: Date.now, expires: '5m' } // Expires in 5 minutes
});

module.exports = mongoose.model('OTP', OTPSchema);
