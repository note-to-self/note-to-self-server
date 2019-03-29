const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  isRepeated: {
    type: Boolean,
    default: false
  },
  repeat: {
    type: { daily: Boolean, weekly: Boolean },
    default: false
  },
  lastSent: {
    type: Date,
    default: null
  },
  privateMessage: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Note', notesSchema);
