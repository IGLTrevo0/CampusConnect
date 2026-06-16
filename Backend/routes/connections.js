const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getConnections,
  getPendingRequests,
  getMyRequests,
  getReceivedRequests,
} = require('../controllers/connectionController');
const protect = require('../middleware/authMiddleware');

router.use(protect); // all connection routes are protected

router.post('/send/:id', sendRequest);
router.put('/:id/accept', acceptRequest);
router.put('/:id/reject', rejectRequest);
router.get('/', getConnections);
router.get('/requests', getPendingRequests);
router.get('/my-requests', getMyRequests);
router.get('/received-requests', getReceivedRequests);

module.exports = router;