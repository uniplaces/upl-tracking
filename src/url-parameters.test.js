import {
  getUrlParameter,
  getUrlParameters,
  getInferedSource,
  getInferedMedium
} from './url-parameters';

function _setReferrer(referrer) {
  Object.defineProperty(document, 'referrer', { writable: true, value: referrer });
}

function _clearReferrer() {
  Object.defineProperty(document, 'referrer', { writable: true, value: '' });
}

afterEach(() => {
  _clearReferrer();
});

test('it returns a specific parameter', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?upl_source=google&upl_campaign=campaign_1&upl_medium=this-is-a-medium&ir_click_id=1234567890_IRabc';
  const expected = '1234567890_IRabc';
  const result = getUrlParameter(url, 'ir_click_id');

  expect(result).toBe(expected);
});

test('it returns an inexistent specific parameter', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?upl_source=google&upl_campaign=campaign_1&upl_medium=this-is-a-medium&ir_click_id=1234567890_IRabc';
  const result = getUrlParameter(url, 'inexistent_parameter');

  expect(result).toBeNull();
});

test('it parses upl parameters correctly', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?upl_source=google&upl_campaign=campaign_1&upl_medium=this-is-a-medium';
  const expected = {
    adgroup: null,
    adposition: null,
    campaign: 'campaign_1',
    content: null,
    creative: null,
    device: null,
    devicemodel: null,
    gclid: null,
    keyword: null,
    location: null,
    matchtype: null,
    medium: 'this-is-a-medium',
    msclkid: null,
    network: null,
    sitelink: null,
    source: 'google',
    term: null
  };
  const result = getUrlParameters(url);

  expect(result).toEqual(expected);
});

test('it parses utm parameters correctly when there are no upl params', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?utm_source=google&utm_campaign=campaign_1&utm_medium=this-is-a-medium&gclid=12345678909&keyword=cenas';
  const expected = {
    adgroup: null,
    adposition: null,
    campaign: 'campaign_1',
    content: null,
    creative: null,
    device: null,
    devicemodel: null,
    gclid: '12345678909',
    keyword: 'cenas',
    location: null,
    matchtype: null,
    medium: 'this-is-a-medium',
    msclkid: null,
    network: null,
    sitelink: null,
    source: 'google',
    term: null
  };
  const result = getUrlParameters(url);

  expect(result).toEqual(expected);
});

test('it infers the source', () => {
  _setReferrer('https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1');

  const expected = 'baidu_organic';
  const result = getInferedSource();

  expect(result).toBe(expected);
});

test('it does not infer the source when the referrer is uniplaces', () => {
  const referer = 'https://www.uniplaces.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1';
  _setReferrer(referer);

  const result = getInferedSource(referer, );
  const expected = null;

  expect(result).toBe(expected);
});

test('it infers the medium', () => {
  const referer = 'https://www.google.com/';
  _setReferrer(referer);

  const expected = 'organic';
  const result = getInferedMedium(referer, { origin: null, destination: null, language: null });

  expect(result).toBe(expected);
});

test('it infers the medium with location', () => {
  const referer = 'https://www.google.com/';
  _setReferrer(referer);

  const location = {
    origin: 'portugal',
    destination: 'honduras',
    city: 'tegucigalpa',
    language: 'portuguese'
  };
  const expected = 'portugal_honduras_portuguese';
  const result = getInferedMedium('this-is-an-url', location);

  expect(result).toBe(expected);
});

test('it infers the medium when some fields are missing', () => {
  _setReferrer('https://www.google.com/');

  const location = {
    origin: null,
    destination: 'honduras',
    city: 'tegucigalpa',
    language: 'portuguese'
  };
  const expected = 'xx_honduras_portuguese';
  const result = getInferedMedium('this-is-an-url', location);

  expect(result).toBe(expected);
});

test('it does not infer the medium when there is no referrer', () => {
  const location = {
    origin: null,
    destination: 'honduras',
    city: 'tegucigalpa',
    language: 'portuguese'
  };
  const expected = 'xx_honduras_portuguese';
  const result = getInferedMedium('this-is-an-url', location);

  expect(result).toBe(expected);
});

test('it does not infer the medium when the referrer is uniplaces', () => {
  _setReferrer('https://staging-uniplaces.com/');

  const expected = 'organic';
  const result = getInferedMedium('', { origin: null, destination: null, language: null });

  expect(result).toBe(expected);
});
