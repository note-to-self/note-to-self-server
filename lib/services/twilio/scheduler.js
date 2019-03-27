const Note = require('../../models/Note');
const { sendMessage } = require('./twilio');
const { populateUsers } = require('../auth');

module.exports = () => setInterval(checkSchedule, 5000);

function checkSchedule() {
  return Promise.all([
    // finds daily notes
    Note.find({
      isRepeated: true,
      repeat: { daily: true, weekly: false },
      lastSent: {
        $lte: checkTime(1)
      },
    }).limit(2),
    //fines weekly notes
    Note.find({
      isRepeated: true,
      repeat: { daily: false, weekly: true },
      lastSent: {
        $lte: checkTime(7)
      },
    }).limit(2), 
    //finds single notes that should be sent
    Note.find({
      isRepeated: false,
      lastSent: null,
      time: {
        $lte: checkTime()
      }
    }).limit(2)

  ])
    .then(([daily, weekly, single]) => {
      return [...daily, ...weekly, ...single];
    })
    .then(notes => updateLastSentTime(notes))
    .then(notes => populateUsers(notes))
    .then(notes => {
      return notes.map(note => ({
        isRepeated: note.isRepeated,
        id: note._id,
        body: note.body, 
        phone:  note.userId.user_metadata.phone
      }));
    })
    .then(notes => {
      console.log(notes);
      return Promise.all(notes.map(message => sendMessage(message)));
    })
    .catch(err => console.log('ERROR', err));
}

const updateLastSentTime = (notes) => {
  return Promise.all(notes.map(note => {
    const newDate = new Date().toLocaleString();
    return Note
      .findByIdAndUpdate(note._id, { lastSent: newDate }, { new: true })
      .then(notes => {
        return notes;
      });
  }));
};

const checkTime = (cycle) => {
  if(cycle) return Date.now() - (1000 * 3600 * 24 * cycle);
  else {
    return Date.now();
  }
};
