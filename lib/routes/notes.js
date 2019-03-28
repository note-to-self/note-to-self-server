const Note = require('../models/Note');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { time, repeat, isRepeated, lastSent, date, body, privateMessage } = req.body;
    const userId = req.user.sub || 'some user id'; 
    const sendAt = new Date(date + ' ' + time);
    const getTimeDate = sendAt.getTime();
    
    Note
      .create({
        body,
        time: getTimeDate,
        userId,
        repeat,
        isRepeated,
        lastSent,
        privateMessage
      })
      .then(note => {
        return res.send(note);
      })
      .catch(next);
  })

  .get('/', ensureAuth(), (req, res, next) => {
    Note
      .find({ privateMessage: false })
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

  .delete('/:id', (req, res, next) => {
    const { id } = req.params.id;
    Note
      .findOneAndDelete(id)
      .then(note => res.send(note))
      .catch(next);
  });


