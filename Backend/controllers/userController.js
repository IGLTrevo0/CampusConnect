const User = require('../models/User');

// GET /api/users/:id — public profile
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/users/profile — profile setup/update (protected)
exports.updateProfile = async (req, res) => {
  try {
    const { bio, github, linkedin, portfolio, interests, year, branch, skills, achievements, mentorAvailability } = req.body;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { bio, github, linkedin, portfolio, interests, year, branch, skills, achievements, mentorAvailability },
      { new: true, runValidators: true }
    ).select('-password');

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/users?skill=React&role=mentor&branch=CSE&year=2 — search + mentor discovery
exports.searchUsers = async (req, res) => {
  try {
    const { skill, role, branch, year } = req.query;
    const filter = {};

    if (skill) filter.skills = { $in: [new RegExp(skill, 'i')] };
    if (role) filter.role = role;
    if (branch) filter.branch = new RegExp(branch, 'i');
    if (year) filter.year = year;

    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};