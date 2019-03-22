const Note = require('../../lib/models/Note');


describe('validates note model', () => {
  it('note model', () => {
    const note = new Note({
      body: 'hello',
      phoneNumber: '18082686581'
    });
    expect(note.toJSON()).toEqual({
      _id: expect.any(Object),
      body: 'hello',
      phoneNumber: '18082686581'
    });
  });
});
