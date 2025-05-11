const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  number: Number,
  budget: Number,
  size: String,
  details: String,
  images: [String], // Store image URLs or file paths
});

const ProposeIdea = mongoose.model('ProposeIdea', formSchema);

module.exports = ProposeIdea;
