const Note = require('../models/Note');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { time, repeat, isRepeated, lastSent, body, privateMessage } = req.body;
    const userId = req.user.sub || 'some user id'; 
    
    Note
      .create({
        body,
        time,
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

  .get('/user/allnotes', ensureAuth(), (req, res, next) => {
    Note
      .find({ userId: req.user.sub })
      .then(notes => res.send(notes))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    const { id } = req.params;
    Note
      .findByIdAndDelete(id)
      .then(note => res.send(note))
      .catch(next);
  });


