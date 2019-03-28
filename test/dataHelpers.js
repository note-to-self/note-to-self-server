require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const Favorites = require('../lib/models/Favorites');
const Note = require('../lib/models/Note');

const connect = require('../lib/utils/connect');

beforeAll(() => {
  return connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

beforeEach(() => {
  return seedData();
});

afterAll(() => {
  return mongoose.connection.close();
});

const getFaves = () => {
  return Favorites
    .findOne()
    .then(favorites => {
      return JSON.parse(JSON.stringify(favorites));
    });
};

const getNote = () => {
  return Note 
    .findOne()
    .then(note => {
      return JSON.parse(JSON.stringify(note));
    });
};

module.exports = {
  getFaves,
  getNote
};
