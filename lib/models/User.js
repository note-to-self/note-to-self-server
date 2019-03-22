const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: true
  },
  image: {
    type: String, 
  },
  favorites: {
    type: Array, 
  }
});

module.exports = mongoose.model('Users', userSchema);

