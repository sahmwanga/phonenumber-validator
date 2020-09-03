const { getPrefix } = require('../index');

describe('Test for number validation', () => {
  test('get number prefix', () => {
    expect(getPrefix(255653679553)).toBe('25565');
  });
});
