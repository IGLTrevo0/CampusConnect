const express = require('express');
const router = express.Router();

const {
  googleSignIn,
  verifyOTP,
  manualSignup,
  manualLogin,
  getMe
} = require('../controllers/authController');

const protect = require('../middleware/authMiddleware');

router.post('/google', googleSignIn);
router.post('/manual-signup', manualSignup);
router.post('/manual-login', manualLogin);
router.post('/verify-otp', verifyOTP);

router.get('/me', protect, getMe);

module.exports = router;