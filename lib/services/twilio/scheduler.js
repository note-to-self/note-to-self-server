import Note from '../../models/Note';
import { sendMessage } from './twilio';

const sendNotes = setInterval(checkSchedule, 3000);

function checkSchedule() {
  Note.find({
    lastSent: {
      $lte: new Date(ISODate().getTime() - 1000 * 3600 * 24 * 1)
    },
    time: { $lte: Date.now }
  }).limit (100)
    .then(notes => {
      notes.forEach(note => sendMessage(note));
    });

}

