const Note = require('../models/Note');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .post('/', ensureAuth(), (req, res, next) => {
    const { time, repeat, body, privateMessage } = req.body;

    Note
      .create({
        body,
        time,
        userId: req.user.sub,
        repeat,
        lastSent: null, // last sent is always null to begin
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
      // only get notes that belong to you
      .findOne({ _id: req.params.id, userId: req.user.sub })
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
      // only delete note if you own it
      .findOneAndDelete({ _id: id, userId: req.user.sub })
      .then(note => res.send(note))
      .catch(next);
  });
