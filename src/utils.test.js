import { capitalize, i18nToUplLocale } from './utils';

test('it capitalizes', () => {
  const expected = 'Baidu';
  const result = capitalize('baidu');

  expect(result).toBe(expected);
});

test('it capitalizes when string has uppercased letters in the middle', () => {
  const expected = 'Baidu';
  const result = capitalize('baiDU');

  expect(result).toBe(expected);
});

test('it converts i18n to UPL locale', () => {
  const expected = 'portuguese';
  const result = i18nToUplLocale('pt-pt');

  expect(result).toBe(expected);
});
