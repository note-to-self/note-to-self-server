/* eslint-disable no-console*/
require('dotenv').config();
require('./lib/utils/connect')();
const app = require('./lib/app');
const sendNotes = require('./lib/services/twilio/scheduler');

const PORT = process.env.PORT || 7891;

app.listen(PORT, () => {
  console.log('running');
  sendNotes();
});

