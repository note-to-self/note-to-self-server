const Note = require('../lib/models/Note');
const chance = require('chance').Chance();

function seedData() {
  return Promise.all([...Array(15)].map(() => {
    const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
    const body = chance.sentence();
    const time = '2019-03-25 15:05:00.000Z';
    const isRepeated = true;
    const repeat = {
      daily: true,
      weekly: false
    };
    const lastSent = '2019-03-24 15:05:00.000Z';
    const privateMessage = false;
    return Note.create({ body, time, isRepeated, repeat, lastSent, userId, privateMessage });
  }))
    .then(() => {
      return Promise.all([...Array(15)].map(() => {
        const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
        const body = chance.sentence();
        const time = '2018-03-25 15:05:00.000Z';
        const isRepeated = true;
        const repeat = {
          daily: false,
          weekly: true
        };
        const lastSent = '2018-03-24 15:05:00.000Z';
        const privateMessage = false;
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId, privateMessage });
      }));
    })
    .then(() => {
      return Promise.all([...Array(15)].map(() => {
        const userId = 'auth0|5c9a66c1135eba0f7d2fc1f3';
        const body = chance.sentence();
        const time = '2019-03-25 15:05:00.000Z';
        const isRepeated = false;
        const repeat = {
          daily: false,
          weekly: false
        };
        const lastSent = '2019-03-24 15:05:00.000Z';
        const privateMessage = false;
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId, privateMessage });
      }));
    });
}

module.exports = seedData;
