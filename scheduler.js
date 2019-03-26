require('dotenv').config();
require('./lib/utils/connect')();
const Note = require('./lib/models/Note');
// const { sendMessage } = require('./lib/services/twilio/twilio');
const { populateUsers } = require('./lib/services/auth');


const sendNotes = setInterval(checkSchedule, 30000);

function checkSchedule() {
  return Promise.all([
    Note.find({
      isRepeated: true,
      repeat: { daily: true, weekly: false },
      lastSent: {
        $lte: checkTime(1)
      },
    }).limit(2)
      .then(notes => populateUsers(notes))
      .then(notes => {
        console.log('daily notes', notes);
        // notes.forEach(note => sendMessage(note));
      }),

    Note.find({
      isRepeated: true,
      repeat: { daily: false, weekly: true },
      lastSent: {
        $lte: checkTime(7)
      },
    }).limit(2)
      .then(notes => populateUsers(notes))
      .then(notes => {
        console.log('weekly notes', notes);
      }),

    Note.find({
      isRepeated: false,
      time: checkTime()
    }).limit(2)
      .then(notes => populateUsers(notes))
      .then(notes => {
        console.log('one time notes', notes);
      })
  ]).catch(console.error);

}

const checkTime = (cycle) => {
  if(cycle) return Date.now() - (1000 * 3600 * 24 * cycle);
  else {
    return Date.now();
  }
};
