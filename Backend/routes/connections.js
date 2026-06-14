const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getConnections,
  getPendingRequests
} = require('../controllers/connectionController');
const protect = require('../middleware/authMiddleware');

router.use(protect); // all connection routes are protected

router.post('/send/:id', sendRequest);
router.put('/:id/accept', acceptRequest);
router.put('/:id/reject', rejectRequest);
router.get('/', getConnections);
router.get('/requests', getPendingRequests);

module.exports = router;