const Favorites = require('../models/Favorites');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

const updateFavesList = (document, id) => {
  const { notes } = document;
  const index = notes.findIndex(noteId => noteId.toString() === id);
  if(index === -1) {
    return notes.push(id);
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
      .findOne({ userId: req.user.sub })
      .then(document => updateFavesList(document, req.body._id))
      .then(updatedFaves => Favorites.findOneAndUpdate({ userId: req.user.sub }, { favorites: updatedFaves }, { new: true }))
      .then(update => res.send(update))
      .catch(next);
  });
