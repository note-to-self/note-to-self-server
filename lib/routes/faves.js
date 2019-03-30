const Favorites = require('../models/Favorites');
const { Router } = require('express');
const ensureAuth = require('../middleware/ensureAuth');

module.exports = Router()
  .get('/', ensureAuth(), (req, res, next) => {
    Favorites
      .find({ userId: req.user.sub })
      .populate('notes')
      .lean()
      .then(faves => res.send(faves))
      .catch(next);
  })

  .patch('/add', ensureAuth(), (req, res, next) => {
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
  })

  .patch('/remove', ensureAuth(), (req, res, next) => {
    Favorites
      .findOneAndUpdate({ userId: req.user.sub },
        {
          $pull: {
            notes: req.body.id // use pull remove value from array
          }
        },
        { new: true, upsert: true }) // can use upsert to create or update
      .then(favorites => res.send(favorites))
      .catch(next);
  });
