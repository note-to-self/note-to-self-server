const Note = require('../models/Note');
const { Router } = require('express');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { body, phoneNumber } = req.body;
    Note
      .create({
        body,
        phoneNumber
      })
      .then(note => res.send(note))
      .catch(next);
  });
