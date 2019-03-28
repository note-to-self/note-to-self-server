const mongoose = require('mongoose');

const favoritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  notes: [{
    ref: 'Note',
    type: mongoose.Schema.Types.ObjectId
  }]
});

// instance method updateFavesList??

module.exports = mongoose.model('favorites', favoritesSchema);

