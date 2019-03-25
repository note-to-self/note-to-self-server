const User = require('../lib/models/User');
const Note = require('../lib/models/Note');
const chance = require('chance').Chance();

function seedData() {
  return Promise.all(  
    [...Array(2)].map((_, i) => {
      const name = `kate${i}`;
      const phoneNumber = '18082686581';
      return User.create({ name, phoneNumber });
    })
  )
    .then(users => {
      return Promise.all([...Array(15)].map(() => {
        const user = chance.pickone(users);
        const userId = user._id;
        const body = chance.sentence();
        const time = '2019-03-25 15:05:00.000Z';
        // const time = chance.date({ string: true });
        const isRepeated = true;
        const repeat = {
          daily: true,
          weekly: false
        };
        const lastSent = '2019-03-24 15:05:00.000Z';
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId });
      }));
    })
    .then(users => {
      return Promise.all([...Array(15)].map(() => {
        const user = chance.pickone(users);
        const userId = user._id;
        const body = chance.sentence();
        const time = '2019-03-25 15:05:00.000Z';
        // const time = chance.date({ string: true });
        const isRepeated = true;
        const repeat = {
          daily: false,
          weekly: true
        };
        const lastSent = '2019-03-24 15:05:00.000Z';
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId });
      }));
    })
    .then(users => {
      return Promise.all([...Array(15)].map(() => {
        const user = chance.pickone(users);
        const userId = user._id;
        const body = chance.sentence();
        const time = '2019-03-25 15:05:00.000Z';
        // const time = chance.date({ string: true });
        const isRepeated = false;
        const repeat = {
          daily: false,
          weekly: false
        };
        const lastSent = '2019-03-24 15:05:00.000Z';
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId });
      }));
    });
}

module.exports = seedData;
