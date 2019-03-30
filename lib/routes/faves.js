const Favorites = require('../models/Favorites');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

const updateFavesList = (document, id) => {
  const { notes } = document;
  const index = notes.findIndex(note => note === id);
  if(index === -1) {
    notes.push(id);
    return notes;
  } else {
    return notes.slice(index, 1);
  }
};

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Favorites
      .find({ userId: req.user.sub })
      .populate('notes')
      .lean()
      .then(faves => res.send(faves))
      .catch(next);
  })

  .put('/', ensureAuth(), (req, res, next) => {
    Favorites
      .findOneAndUpdate({ userId: req.user.sub },
        {
          $addToSet: {
            notes: req.body.id // use addToSet to append a new (unique) value to notes
          }
        },
        { new: true, upsert: true }) // can use upsert to create or update
      .then(favorites => res.send(favorites))
      .catch(next);
  });
