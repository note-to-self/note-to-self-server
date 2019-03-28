const Favorites = require('../models/Favorites');
const Note = require('../models/Note');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

const updateFavesList = (document, request) => {
  const { body } = request;
  const { favorites } = document;
  const index = favorites.indexOf(body);
  if(index === -1) {
    return favorites.push(body);
  } else {
    return favorites.slice(index, 1);
  }
};

module.exports = Router()

  .get('/:id', ensureAuth(), (req, res, next) => {
    Favorites
      .findById(req.params.id)
      .lean()
      .then(({ favorites }) => {
        return Promise.all(favorites.map(noteId => {
          return Note
            .findById(noteId)
            .select({ body: true });
        }));
      })
      .then(faves => res.send(faves))
      .catch(next);
  })
  
  .put('/:id', ensureAuth(), (req, res, next) => {
    Favorites
      .findById(req.params.id)
      .then(document => updateFavesList(document, req))
      .then(updatedFaves => Favorites.findByIdAndUpdate(req.params.id, { favorites: updatedFaves }, { new: true }))
      .then(update => res.send(update))
      .catch(next);
  });
