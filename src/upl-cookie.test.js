import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';

jest.mock('js-cookie');

test('it constructs a upl cookie with default tracking id and timestamp', () => {
  const result = new UplCookie();

  expect(result.trackingId).toBeDefined();
  expect(result.timestamp).toBeDefined();
});

test('it constructs a upl cookie with custom tracking id and timestamp', () => {
  const result = new UplCookie('123-456-789', 150000000);

  expect(result.trackingId).toBeDefined();
  expect(result.trackingId).toBe('123-456-789');
  expect(result.timestamp).toBeDefined();
  expect(result.timestamp).toBe(150000000);
});

test('it returns the cookie name', () => {
  const expected = 'upl_cookie';
  const result = UplCookie.getCookieName();

  expect(result).toBe(expected);
});

test('it returns the cookie touch ID', () => {
  const cookie = new UplCookie();
  const expected = `${cookie.trackingId}_${cookie.timestamp}`;
  const result = cookie.getTouchId();

  expect(result).toBe(expected);
});

test('it returns the location', () => {
  const cookie = new UplCookie();
  const expected = {
    destination: undefined,
    origin: undefined,
    language: undefined
  };
  const result = cookie.getLocation();

  expect(result).toEqual(expected);
});

test('it sets the parameters', () => {
  const cookie = new UplCookie('1', 2);
  const expected = {
    trackingId: '1',
    timestamp: 2,
    source: 'source',
    medium: 'medium',
    campaign: 'campaign',
    term: 'term',
    content: 'content',
    gclid: 'gclid',
    msclkid: 'msclkid'
  };
  const result = cookie.setParameters({
    source: 'source',
    medium: 'medium',
    campaign: 'campaign',
    term: 'term',
    content: 'content',
    gclid: 'gclid',
    msclkid: 'msclkid',
    nonSpecifiedParameter: 'this-will-not-be-saved'
  });

  expect(result).toEqual(expected);
});

test('it sets the new location', () => {
  const cookie = new UplCookie('123-456', 1000000);
  const expected = {
    trackingId: '123-456',
    timestamp: 1000000,
    origin: 'portugal',
    destination: 'barcelona',
    language: 'portuguese'
  };
  const result = cookie.setLocation({
    origin: 'portugal',
    destination: 'barcelona',
    language: 'pt-pt'
  });

  expect(result).toEqual(expected);
});

test('it saves the cookie in Cookies', () => {
  const cookie = new UplCookie('123-456', 150000);
  const result = cookie.save();

  const expectedCookieName = 'upl_cookie';
  const expectedCookieJson = { trackingId: '123-456', timestamp: 150000 };
  const expectedOptions = { expires: 180, domain: '.uniplaces.com' };

  expect(result).toBeDefined();
  expect(Cookies.set).toHaveBeenCalledTimes(1);
  expect(Cookies.set).toHaveBeenCalledWith(expectedCookieName, expectedCookieJson, expectedOptions);
});

test('it returns as JSON', () => {
  const cookie = new UplCookie();
  const result = cookie.toJSON();
  const expected = {
    trackingId: cookie.trackingId,
    timestamp: cookie.timestamp
  };

  expect(result).toEqual(expected);
});

test('it returns a new instance from a JSON', () => {
  const expected = {
    trackingId: 1,
    timestamp: 15498090,
    source: 'cenas',
    medium: 'cenas-2'
  };
  const result = UplCookie.fromJSON({
    trackingId: 1,
    timestamp: 15498090,
    source: 'cenas',
    medium: 'cenas-2'
  });

  expect(result).toEqual(expected);
});
