const { getNote, getUser } = require('../dataHelpers');
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

  it('can get a list of notes', () => {
    return request(app)
      .get('/notes')
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body).toHaveLength(5);
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
    const { _id } = await getUser();
    return request(app)
      .get(`/notes/user/${_id}`)
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('can update lastSent field in a note by id', async() => {
    const { _id } = await getNote();
    const newDate = new Date();
    return request(app)
      .put(`/notes/${_id}`)
      .send({ lastSent: newDate })
      .then(res => {
        expect(res.ok).toBeTruthy();
        expect(res.body).toEqual({
          __v: 0,
          _id,
          body: expect.any(String),
          isRepeated: expect.any(Boolean),
          lastSent: newDate.toISOString(),
          repeat: expect.any(Object),
          time: expect.any(String),
          userId: expect.any(String),
        });
      });
  });
});
