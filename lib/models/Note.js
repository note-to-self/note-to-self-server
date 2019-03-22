const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  body: {
    type: String,
    required: true
  },
  time: {
    type: Date,
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
  }


});

module.exports = mongoose.model('Notes', notesSchema);
