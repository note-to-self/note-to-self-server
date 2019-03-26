const Note = require('../../models/Note');
const { sendMessage } = require('./twilio');
const { populateUsers } = require('../auth');

module.exports = () => setInterval(checkSchedule, 3000);

function checkSchedule() {
  return Promise.all([
    Note.find({
      isRepeated: true,
      repeat: { daily: true, weekly: false },
      lastSent: {
        $lte: checkTime(1)
      },
    }).limit(2),
    Note.find({
      isRepeated: true,
      repeat: { daily: false, weekly: true },
      lastSent: {
        $lte: checkTime(7)
      },
    }).limit(2), 
    Note.find({
      isRepeated: false,
      time: checkTime()
    }).limit(2)

  ])
    .then(([daily, weekly, single]) => {
      return [...daily, ...weekly, ...single];
    })
    .then(notes => populateUsers(notes))
    .then(notes => {
      return notes.map(note => ({
        body: note.body, 
        phone:  note.userId.user_metadata.phone
      }));
    })
    .then(notes => {
      return Promise.all(notes.map(message => sendMessage(message)));
    })
    .catch(err => console.log('ERROR', err));
}
const checkTime = (cycle) => {
  if(cycle) return Date.now() - (1000 * 3600 * 24 * cycle);
  else {
    return Date.now();
  }
};

