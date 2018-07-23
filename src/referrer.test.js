import { getReferrer, isEmptyReferrer } from './referrer';

function _setReferrer(referrer) {
  Object.defineProperty(document, 'referrer', { writable: true, value: referrer });
}

function _clearReferrer() {
  Object.defineProperty(document, 'referrer', { writable: true, value: '' });
}

afterEach(() => {
  _clearReferrer();
});

test('it verifies that the referrer is empty', () => {
  expect(isEmptyReferrer()).toBe(true);
});

test('it verifies that the referrer is not empty', () => {
  const referrer = 'http://www.uniplaces.com/';

  _setReferrer(referrer);

  expect(isEmptyReferrer()).toBe(false);
});

test('it returns the referrer as URL', () => {
  const referrer = 'http://www.uniplaces.com/';

  _setReferrer(referrer);

  const expected = 'www.uniplaces.com';
  const result = getReferrer();

  expect(result.href).toBe(referrer);
  expect(result.host).toBe(expected);
});

test('it returns null when there is no referrer', () => {
  const result = getReferrer();

  expect(result).toBe(null);
});
