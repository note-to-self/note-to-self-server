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
      .findOne({ userId: req.user.sub })
      .then(res => {
        if(res === null) {
          return Favorites
            .create({ notes: [], userId: req.user.sub });
        }
        return res;
      })
      .then(document => updateFavesList(document, req.body.id))
      .then(updatedFaves => {
        console.log(updatedFaves);
        return Favorites.findOneAndUpdate({ userId: req.user.sub }, { notes: updatedFaves }, { new: true });})
      .then(update => res.send(update))
      .catch(next);
  });
