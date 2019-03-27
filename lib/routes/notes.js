const Note = require('../models/Note');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { time, repeat, isRepeated, lastSent, date, body } = req.body;
    const userId = req.user.sub; 
    const sendAt = new Date(date + ' ' + time);
    const getTimeDate = sendAt.getTime();
    console.log('REQ BODY', req.body);
    
    Note
      .create({
        body,
        time: getTimeDate,
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
  })

  .put('/:id', (req, res, next) => {
    const { lastSent } = req.body;
    Note
      .findByIdAndUpdate(req.params.id, { lastSent }, { new: true })
      .then(note => res.send(note))
      .catch(next);
  });


