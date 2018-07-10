import { getInferedSource, getInferedMedium } from './url-parameters';

function _setReferrer(referrer) {
  Object.defineProperty(document, 'referrer', { writable: true, value: referrer });
}

function _clearReferrer() {
  Object.defineProperty(document, 'referrer', { writable: true, value: null });
}

afterEach(() => {
  _clearReferrer();
});

test('it infers the source', () => {
  _setReferrer('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1');

  const expected = 'baidu';
  const result = getInferedSource();

  expect(result).toBe(expected);
});

test('it does not infer the source when the referrer is uniplaces', () => {
  _setReferrer('https://www.uniplaces.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1');

  const expected = null;
  const result = getInferedSource();

  expect(result).toBe(expected);
});

test('it infers the medium', () => {
  _setReferrer('https://www.google.com/');
  const expected = 'organic';
  const result = getInferedMedium();

  expect(result).toBe(expected);
});

test('it does not infer the medium when there is no referrer', () => {
  const expected = null;
  const result = getInferedMedium();

  expect(result).toBe(expected);
});

test('it does not infer the medium when the referrer is uniplaces', () => {
  _setReferrer('https://staging-uniplaces.com/');

  const expected = null;
  const result = getInferedMedium();

  expect(result).toBe(expected);
});
