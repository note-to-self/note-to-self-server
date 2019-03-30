const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const sendMessage = (note) => {
  const { body, phone } = note;
  const twilioPhone = process.env.TWILIO_PHONE;
  return client.messages
    .create({
      body: body,
      from: twilioPhone,
      to: phone
    });
};

module.exports = {
  sendMessage
};
