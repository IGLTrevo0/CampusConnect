const express = require('express');
const router = express.Router();

const {
  googleSignIn,
  verifyOTP,
  manualSignup,
  manualLogin,
  getMe,
  resendOTP,
} = require('../controllers/authController');

const protect = require('../middleware/authMiddleware');

router.post('/google', googleSignIn);
router.post('/manual-signup', manualSignup);
router.post('/manual-login', manualLogin);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);

router.get('/me', protect, getMe);

module.exports = router;