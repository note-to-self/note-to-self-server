const Note = require('../../lib/models/Note');
const User = require('../../lib/models/User');



describe('validates note model', () => {
  it('note model', () => {
    const user = new User({
      name: 'lance',
      phoneNumber: '18082686581'
    });
    const note = new Note({
      userId: user._id,
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
      userId: user._id,
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
