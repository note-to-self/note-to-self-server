const Note = require('../lib/models/Note');
const Favorites = require('../lib/models/Favorites');
const chance = require('chance').Chance();

function seedData() {
  return Promise.all([...Array(1)].map(() => {
    const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
    const body = chance.sentence();
    const time = new Date('2019-04-01 15:05:00.000Z');
    const isRepeated = true;
    const repeat = {
      daily: true,
      weekly: false
    };
    const lastSent = new Date('2019-03-24 15:05:00.000Z');
    const privateMessage = false;
    return Note.create({ body, time, isRepeated, repeat, lastSent, userId, privateMessage });
  }))
    .then(() => {
      return Promise.all([...Array(1)].map(() => {
        const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
        const body = chance.sentence();
        const time = new Date('2018-04-01 15:05:00.000Z');
        const isRepeated = true;
        const repeat = {
          daily: false,
          weekly: true
        };
        const lastSent = new Date('2018-03-24 15:05:00.000Z');
        const privateMessage = false;
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId, privateMessage });
      }));
    })
    .then(() => {
      return Promise.all([...Array(1)].map(() => {
        const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
        const body = chance.sentence();
        const time = new Date('2019-04-01 15:05:00.000Z');
        const isRepeated = false;
        const repeat = {
          daily: false,
          weekly: false
        };
        const lastSent = new Date('2019-03-24 15:05:00.000Z');
        const privateMessage = false;
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId, privateMessage });
      }));
    })
    .then(notes => {
      return Promise.all([...Array(5)].map(() => {
        const note1 = chance.pickone(notes);
        const note2 = chance.pickone(notes);
        const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
        const favorites = [
          note1._id,
          note2._id
        ];
        return Favorites.create({ userId, favorites });
      }));
    });
}


module.exports = seedData;
