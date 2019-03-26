const Note = require('../../lib/models/Note');
require('../dataHelpers');


describe('validates note model', () => {
  it('note model', () => {
    const note = new Note({
      userId: 'auth0|5c9a66c1135eba0f7d2fc1f3',
      body: 'hello',
      time: Date.now(),
      isRepeated: false,
      repeat: {
        daily: true,
        weekly: false
      },
      lastSent: {
        type: Date.now()
      }
    });
    expect(note.toJSON()).toEqual({
      _id: expect.any(Object),
      userId: 'auth0|5c9a66c1135eba0f7d2fc1f3',
      body: 'hello',
      time: expect.any(Date),
      isRepeated: false,
      repeat: {
        daily: true,
        weekly: false
      },
      lastSent: null
    });
  });
});
