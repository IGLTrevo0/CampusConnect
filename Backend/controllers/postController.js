const Post = require("../models/Post");
const Application = require("../models/Application");

// @desc    Create a post
// @route   POST /api/posts
// @access  Protected
const createPost = async (req, res) => {
  try {
    const {
      title,
      category,
      type,
      description,
      skillsNeeded,
      hackathonName,
      theme,
      teamSize,
      deadline,
    } = req.body;

    const post = await Post.create({
      creator: req.user._id,
      title,
      category,
      type,
      description,
      skillsNeeded,
      hackathonName,
      theme,
      teamSize,
      deadline,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Protected
const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      creator: req.user._id,
    })
      .populate("creator", "name email branch year")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
};
  };

const getPosts = async (req, res) => {
  try {
    const { category, type, skill, status } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (skill) filter.skillsNeeded = { $in: [skill] };

    const posts = await Post.find(filter)
      .populate("creator", "name email branch year")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Protected
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "creator",
      "name email branch year",
    );

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post (own posts only)
// @route   DELETE /api/posts/:id
// @access  Protected
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.creator.toString() !== req.user._id.toString())
      return res
        .status(403)
        .json({ message: "Not authorized to delete this post" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Apply to a post
// @route   POST /api/posts/:id/apply
// @access  Protected
const applyToPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.status !== "open")
      return res.status(400).json({ message: "Post is no longer open" });
    if (post.creator.toString() === req.user._id.toString())
      return res.status(400).json({ message: "Cannot apply to your own post" });

    const existing = await Application.findOne({
      post: req.params.id,
      applicant: req.user._id,
    });
    if (existing)
      return res.status(400).json({ message: "Already applied to this post" });

    const application = await Application.create({
      post: req.params.id,
      applicant: req.user._id,
      message: req.body.message,
    });

    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications submitted by current user
// @route   GET /api/posts/my-applications
// @access  Protected
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate({
        path: "post",
        populate: {
          path: "creator",
          select: "name email",
        },
      })
      .sort({ createdAt: -1 });

    res.json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get all applications for a post (creator only)
// @route   GET /api/posts/:id/applications
// @access  Protected
const getApplications = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const applications = await Application.find({
      post: req.params.id,
    }).populate("applicant", "name email branch year skills");

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update application status (creator only)
// @route   PUT /api/posts/:id/applications/:appId
// @access  Protected
const updateApplicationStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });
    if (post.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    const application = await Application.findByIdAndUpdate(
      req.params.appId,
      { status: req.body.status },
      { new: true },
    );

    if (!application)
      return res.status(404).json({ message: "Application not found" });

    res.json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update post status
// @route   PUT /api/posts/:id/status
// @access  Protected
const updatePostStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.creator.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Not authorized" });

    post.status = req.body.status;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getMyPosts,
  getPostById,
  deletePost,
  applyToPost,
  getApplications,
  getMyApplications,
  updateApplicationStatus,
  updatePostStatus
};