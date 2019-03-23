const accountSid = 'AC9fac5e44d1a12e0cfd6798b96b8c26fd';
const authToken = '96f95f1db8b399faaf179dd25b779374';
const client = require('twilio')(accountSid, authToken);

const sendMessage = (note) => {
  console.log('note', note);
  const { body, phoneNumber } = note;
  console.log('body', body, phoneNumber);
  return client.messages
    .create({
      body: body,
      from: '+12013319750',
      to: phoneNumber
    })
    .then(message => console.log(message.sid, 'messsageSID'));
};

module.exports = {
  sendMessage
};
