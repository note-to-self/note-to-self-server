const { getNote } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');
const chance = require('chance').Chance();


jest.mock('../../lib/middleware/ensureAuth.js');
jest.mock('../../lib/services/auth.js');

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
        lastSent: null,
        privateMessage: true
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          userId: expect.any(String),
          __v: 0,
          body: 'hello',
          time: expect.any(String),
          isRepeated: false,
          repeat: { daily: false, weekly: false },
          lastSent: null,
          privateMessage: expect.any(Boolean)
        });
      });
  });

  it('can get a list of notes that are marked as privateMessage: false', () => {
    return request(app)
      .get('/notes')
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body[0]).toEqual({
          _id: expect.any(String),
          userId: expect.any(String),
          __v: 0,
          body: expect.any(String),
          time: expect.any(String),
          isRepeated: expect.any(Boolean),
          repeat: expect.any(Object),
          lastSent: expect.anything(),
          privateMessage: false
        });
        expect(res.body[1].privateMessage).toBeFalsy();
      });
  });

  it('can get a note by id', async() => {
    const { _id } = await getNote();
    return request(app)
      .get(`/notes/${_id}`)
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body).toBeTruthy();
      });
  });

  it('can find all notes by a user', async() => {
    return request(app)
      .get('/notes/user/auth0|5c9a66c1135eba0f7d2fc1f3')
      .then(res => {
        expect(res.body).toEqual({ 'err': 'Not Found' });
      });
  });
  it('can delete a note by id', async() => {
    const { _id } = await getNote();
    return request(app)
      .delete(`/notes/${_id}`)
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body).toEqual({
          __v: 0,
          _id,
          body: expect.any(String),
          isRepeated: expect.any(Boolean),
          lastSent: expect.any(String),
          repeat: expect.any(Object),
          time: expect.any(String),
          userId: expect.any(String),
          privateMessage: expect.any(Boolean)
        });
      });
  });
});
