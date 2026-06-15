const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  applyToPost,
  getApplications,
  updateApplicationStatus,
} = require('../controllers/postController');

router.use(protect);

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPostById).delete(deletePost);
router.route('/:id/apply').post(applyToPost);
router.route('/:id/applications').get(getApplications);
router.route('/:id/applications/:appId').put(updateApplicationStatus);

module.exports = router;