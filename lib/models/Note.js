const mongoose = require('mongoose');
const { sendMessage } = require('../services/twilio/twilio');

const DEFAULT_MAX_NOTES = 20;

const checkTime = (cycle) => {
  if(cycle) return Date.now() - (1000 * 3600 * 24 * cycle);
  else {
    return Date.now();
  }
};

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
  repeat: {
    type: Number,
    min: 1
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

notesSchema.methods.send = function(phone) {
  return sendMessage({
    ...this.toJSON(),
    phone
  })
    .then(message => {
      // upon successfully sending the message
      // update dateSent
      this.lastSent = message.dateSent;
      return this.save();
    });
};

// create a function that will create
// the query we want for us.
// Also, I changed the schema so that
// we can have repeats at any day increment
const createScheduleQuery = repeat => ({
  repeat,
  lastSent: {
    $lte: repeat ? checkTime(repeat) : null
  },
  time: {
    $lte: checkTime()
  }
});

// moved this query here for better modularity
// use a DEFAULT_MAX_NOTES constant to remove "magic" numbers
notesSchema.statics.findNotesToSchedule = function(limit = DEFAULT_MAX_NOTES) {
  this
    .find({
      // use $or to do multiple queries in one request to the db
      // since we do this query all the time, this optimization
      // may help.
      $or: [
        createScheduleQuery(1),
        createScheduleQuery(7),
        createScheduleQuery()
      ]
    })
    .limit(limit);
};

module.exports = mongoose.model('Note', notesSchema);
