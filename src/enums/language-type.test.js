import LanguageType from './language-type';

test('it has the correct number of properties', () => {
  const expected = 8;
  const result = Object.keys(LanguageType).length;

  expect(result).toBe(expected);
});
