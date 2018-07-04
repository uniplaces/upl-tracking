import {
  getUrlParameters,
  getReferrer,
  getInferedSource,
  EventsType
} from './upl-tracking';

function _setReferrer(referrer) {
  Object.defineProperty(document, 'referrer', { writable: true, value: referrer });
}

function _clearReferrer() {
  Object.defineProperty(document, 'referrer', { writable: true, value: null });
}

afterEach(() => {
  _clearReferrer();
});

test('it parses upl parameters correctly', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?upl_source=google&upl_campaign=campaign_1&upl_medium=this-is-a-medium';
  const expected = {
    source: 'google',
    campaign: 'campaign_1',
    medium: 'this-is-a-medium',
    content: null,
    gclid: null,
    msclkid: null,
    term: null
  };
  const result = getUrlParameters(url);

  expect(result).toEqual(expected);
});

test('it parses utm parameters correctly when there are no upl params', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?utm_source=google&utm_campaign=campaign_1&utm_medium=this-is-a-medium';
  const expected = {
    source: 'google',
    campaign: 'campaign_1',
    medium: 'this-is-a-medium',
    content: null,
    gclid: null,
    msclkid: null,
    term: null
  };
  const result = getUrlParameters(url);

  expect(result).toEqual(expected);
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

test('it exports the events type enumerable', () => {
  const expected = 'sign-up';
  const result = EventsType.SIGN_UP;

  expect(result).toBe(expected);
});

test('it infers the source', () => {
  _setReferrer('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1');

  const expected = 'baidu';
  const result = getInferedSource();

  expect(result).toBe(expected);
});
