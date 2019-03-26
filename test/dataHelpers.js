require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./seedData');
const User = require('../lib/models/Favorites');
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

const getUser = () => {
  return User
    .findOne({ name: 'kate0' })
    .then(user => {
      return JSON.parse(JSON.stringify(user));
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
  getUser,
  getNote
};
