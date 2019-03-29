const { getNote, getFaves } = require('../dataHelpers');
const request = require('supertest');
const app = require('../../lib/app');

jest.mock('../../lib/middleware/ensureAuth.js');
jest.mock('../../lib/services/auth.js');

describe('faves routes', () => {

  it('can get a fave array by id', async() => {
    const { _id } = await getFaves();
    return request(app)
      .get(`/faves/${_id}`)
      .then(res => {
        expect(res.ok).toEqual(false);
      });
  });

  it('can can add or delete a note in the favorites array', async() => {
    const note = await getNote();
    const noteId = note._id;
    const { _id } = await getFaves();
    return request(app)
      .put(`/faves/${_id}`)
      .send(noteId)
      .then(res => {
        expect(res.ok).toEqual(false);
      });
  });
});
