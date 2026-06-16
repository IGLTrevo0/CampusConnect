const express = require('express');
const router = express.Router();
const { register, login, getMe, verifyOtp } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);
router.get('/me', protect, getMe);

module.exports = router;