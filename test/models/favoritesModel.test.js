const Favorites = require('../../lib/models/Favorites');

describe('validates favorites model', () => {
  it('tests the favorites models', () => {
    const favorites = new Favorites({
      favorites: ['test1', 'test3']
    });
    expect(favorites.toJSON()).toEqual({
      _id: expect.any(Object),
      favorites: ['test1', 'test3'],
    });
  });
})
;
