const express = require('express');
const router = express.Router();
const { getUserById, updateProfile, searchUsers } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.get('/', searchUsers);
router.put('/profile', protect, updateProfile);
router.get('/:id', getUserById);

module.exports = router;