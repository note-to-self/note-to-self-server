const Favorites = require('../models/Favorites');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()

  .get('/:id', ensureAuth(), (req, res, next) => {
    Favorites
      .findById(req.params.id)
      .lean()
      .then(faves => res.send(faves))
      .catch(next);
  })
  
  .put('/:id', ensureAuth(), (req, res, next) => {
    Favorites
      .findById(req.params.id)
      .then(document => {
        const faves = document.favorites;
        const index = faves.indexOf(req.body);
        if(index === -1) {
          return faves.push(req.body);
        } else {
          return faves.slice(index, 1);
        }
      })
      .then(updatedFaves => {
        return Favorites
          .findByIdAndUpdate(req.params.id, { favorites: updatedFaves }, { new: true });
      })
      .then(update => res.send(update))
      .catch(next);
  });
