const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  createPost,
  getPosts,
  getMyPosts,
  getPostById,
  deletePost,
  applyToPost,
  getApplications,
  getMyApplications,
  updateApplicationStatus,
  updatePostStatus,
} = require('../controllers/postController');

router.use(protect);

router.route('/').get(getPosts).post(createPost);
router.get('/my-posts', getMyPosts);
router.get('/my-applications', getMyApplications);
router.route('/:id').get(getPostById).delete(deletePost);
router.route('/:id/apply').post(applyToPost);
router.route('/:id/applications').get(getApplications);
router.route('/:id/applications/:appId').put(updateApplicationStatus);
router.route('/:id/status').put(updatePostStatus);

module.exports = router;