const Connection = require('../models/connection');

// GET /api/connections/my-requests
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      sender: req.user._id,
    }).populate(
      "receiver",
      "name email role branch year skills"
    );

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/connections/received-requests
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      receiver: req.user._id,
    }).populate(
      "sender",
      "name email role branch year skills"
    );

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// POST /api/connections/send/:id — send connection request
exports.sendRequest = async (req, res) => {
  try {
    const { id } = req.params;

    if (id === req.user._id) {
      return res.status(400).json({ message: 'Cannot send request to yourself' });
    }

    const existing = await Connection.findOne({
      sender: req.user._id,
      receiver: id
    });

    if (existing) {
      return res.status(400).json({ message: 'Request already sent' });
    }

    const connection = await Connection.create({
      sender: req.user._id,
      receiver: id
    });

    res.status(201).json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/connections/:id/accept — accept request
exports.acceptRequest = async (req, res) => {
  try {
    const connection = await Connection.findOneAndUpdate(
      { _id: req.params.id, receiver: req.user._id },
      { status: 'accepted' },
      { new: true }
    );

    if (!connection) return res.status(404).json({ message: 'Request not found' });

    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/connections/:id/reject — reject request
exports.rejectRequest = async (req, res) => {
  try {
    const connection = await Connection.findOneAndUpdate(
      { _id: req.params.id, receiver: req.user._id },
      { status: 'rejected' },
      { new: true }
    );

    if (!connection) return res.status(404).json({ message: 'Request not found' });

    res.json(connection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/connections — get all my connections
exports.getConnections = async (req, res) => {
  try {
    const connections = await Connection.find({
      $or: [{ sender: req.user._id }, { receiver: req.user._id }],
      status: 'accepted'
    }).populate('sender receiver', 'name email role branch year skills');

    res.json(connections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/connections/requests — get pending incoming requests
exports.getPendingRequests = async (req, res) => {
  try {
    const requests = await Connection.find({
      receiver: req.user._id,
      status: 'pending'
    }).populate('sender', 'name email role branch year skills');

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};