import utils from './utils';

test('it capitalizes', () => {
  const expected = 'Baidu';
  const result = utils.capitalize('baidu');

  expect(result).toBe(expected);
});

test('it capitalizes when string has uppercased letters in the middle', () => {
  const expected = 'Baidu';
  const result = utils.capitalize('baiDU');

  expect(result).toBe(expected);
});
