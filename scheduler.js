require('dotenv').config();
require('./lib/utils/connect')();
const Note = require('./lib/models/Note');
const { sendMessage } = require('./lib/services/twilio/twilio');


const sendNotes = setInterval(checkSchedule, 3000);

function checkSchedule() {
  Note.find({
    isRepeated: true,
    repeat: { daily: true, weekly: false },
    lastSent: {
      $lte: Date.now() - 1000 * 3600 * 24 * 1
    },
  }).limit (100)
    .then(notes => {
      console.log(notes);
      // notes.forEach(note => sendMessage(note));
    });

}

