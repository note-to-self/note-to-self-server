const Note = require('../models/Note');
const { Router } = require('express');
// const { sendMessage } = require('../services/twilio');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { body, phoneNumber } = req.body;
    Note
      .create({
        body,
        phoneNumber
      })
      .then(note => {
        return res.send(note);
      })
      .catch(next);
  });


