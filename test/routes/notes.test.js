require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
const chance = require('chance').Chance();


describe('note route', () => {

  it('can post a note', () => {
    return request(app)
      .post('/notes')
      .send({
        userId: 'req.user.user_id',
        body: 'hello',
        time: chance.date({ string: true }),
        isRepeated: false,
        repeat: { daily: false, weekly: false },
        lastSent: null
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: 'req.user.user_id',
          __v: 0,
          body: 'hello',
          time: expect.any(String),
          isRepeated: false,
          repeat: { daily: false, weekly: false },
          lastSent: null
        });
      });
  });
});
