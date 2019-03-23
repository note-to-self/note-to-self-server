const User = require('../../lib/models/User');

describe('validates user model', () => {
  it('tests the user models', () => {
    const user = new User({
      name: 'lance',
      phoneNumber: '18082686581'
    });
    expect(user.toJSON()).toEqual({
      _id: expect.any(Object),
      name: 'lance',
      phoneNumber: '18082686581',
      favorites: [],
    });
  });
})
;
