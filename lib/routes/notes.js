const Note = require('../models/Note');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');
// const { sendMessage } = require('../services/twilio');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { body, time, repeat, isRepeated, lastSent } = req.body;
    const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3'; 
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
  })

  .get('/', ensureAuth(), (req, res, next) => {
    Note
      .find()
      .lean()
      .then(notes => res.send(notes))
      .catch(next);
  })

  .get('/:id', ensureAuth(), (req, res, next) => {
    Note
      .findById(req.params.id)
      .lean()
      .then(note => res.send(note))
      .catch(next);
  })

  .get('/user/:id', ensureAuth(), (req, res, next) => {
    Note
      .find({ userId: 'auth0|5c9a66c1135eba0f7d2fc1f3' })
      .then(notes => res.send(notes))
      .catch(next);
  });


