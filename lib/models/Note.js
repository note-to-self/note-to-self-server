const mongoose = require('mongoose');


const notesSchema = new mongoose.Schema({
  body: String,
  phoneNumber: String
});

module.exports = mongoose.model('Notes', notesSchema);
