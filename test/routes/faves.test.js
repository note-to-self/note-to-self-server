const { getNote } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/middleware/ensureAuth.js');
jest.mock('../../lib/services/auth.js');

describe('note route', () => {

  it('can get a note by id', async() => {
    const { _id } = await getFaves();
    return request(app)
      .get(`/faves/${_id}`)
      .then(res => {
        expect(res.ok).toBeTruthy();
      });
  });

  it('can can add a note to the favorites array', () => {

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
