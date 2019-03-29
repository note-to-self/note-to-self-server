const Favorites = require('../../lib/models/Favorites');

describe('validates favorites model', () => {
  it('tests the favorites models', () => {
    const favorites = new Favorites({
      notes: []
    });
    expect(favorites.toJSON()).toEqual({
      _id: expect.any(Object),
      notes: [],
    });
  });
})
;
