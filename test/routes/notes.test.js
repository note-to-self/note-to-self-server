require('dotenv').config();
require('../../lib/utils/connect')();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../lib/app');

describe('note route', () => {
  beforeEach(() => {
    
  });
  afterAll(done => {
    mongoose.connection.close(done());
  });
  afterEach(done => {
    mongoose.connection.dropDatabase(done());
  });
  it('can post a note', () => {
    return request(app)
      .post('/notes')
      .send({
        body: 'hello',
        phoneNumber: '18082686581'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          __v: 0,
          body: 'hello',
          phoneNumber: '18082686581'
        });
      });
  });
});
