const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ['collaboration', 'hackathon'],
      required: true,
    },
    type: {
      type: String,
      enum: ['teammate', 'developer', 'designer', 'researcher'],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    skillsNeeded: [String],
    status: {
      type: String,
      enum: ['open', 'closed', 'filled'],
      default: 'open',
    },
    hackathonName: String,
    theme: String,
    teamSize: Number,
    deadline: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);