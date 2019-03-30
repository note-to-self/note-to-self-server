const Note = require('../../models/Note');
const { populateUsers } = require('../auth');

const DEFAULT_CHECK_INTERVAL = 5000;

// using setTimeout here instead of setInterval.
// setInterval could cause a bug where the previous
// interval hasn't completed yet before the next
// interval starts. This makes it so each interval
// completes before scheduling the next
// interval.
const schedule = (interval = DEFAULT_CHECK_INTERVAL) => setTimeout(() => {
  checkSchedule()
    .then(() => schedule());
}, interval);

// Be carful about updating last sent before
// sending the message. If our API call to
// twilio fails the messages will never be
// delivered
function checkSchedule() {
  return Note
    .findNotesToSchedule()
    .then(notes => populateUsers(notes))
    .then(notes => {
      return Promise.all(
        notes.map(populatedNote => {
          return populatedNote.model.send(populatedNote.user.phone);
        })
      );
    })
    .catch(err => console.log('ERROR', err));
}

module.exports = schedule;
