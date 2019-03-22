const User = require('../lib/models/User');
const Note = require('../lib/models/Note');
const chance = require('chance').Chance();

function seedData() {
  return Promise.all(  
    [...Array(2)].map(() => {
      const name = chance.name();
      const phoneNumber = '18082686581';
      return User.create({ name, phoneNumber });
    })
  )
    .then(users => {
      return Promise.all([...Array(5)].map(() => {
        const userId = chance.pickone(users);
        const body = chance.sentence();
        const time = chance.date({ string: true });
        const isRepeated = false;
        const repeat = {
          daily: false,
          weekly: false
        };
        const lastSent = null;
        return Note.create({ body, time, isRepeated, repeat, lastSent, userId });
      }));
    });
}

module.exports = seedData;
