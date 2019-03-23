const Note = require('../models/Note');
const { Router } = require('express');
// const { sendMessage } = require('../services/twilio');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { body, time, repeat, isRepeated, lastSent } = req.body;
    const userId = 'req.user.user_id'; 
    Note
      .create({
        body,
        time,
        userId,
        repeat,
        isRepeated,
        lastSent
      })
      .then(note => {
        return res.send(note);
      })
      .catch(next);
  });


