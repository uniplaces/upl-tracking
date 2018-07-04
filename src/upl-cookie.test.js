import UplCookie from './upl-cookie';

test('it constructs a upl cookie', () => {
  const result = new UplCookie();

  expect(result.trackingId).toBeDefined();
  expect(result.timestamp).toBeDefined();
});

test('it returns the cookie name', () => {
  const expected = 'upl-cookie';
  const result = UplCookie.getCookieName();

  expect(result).toBe(expected);
});

test('it returns the location', () => {
  const expected = {
    destination: undefined,
    origin: undefined,
    language: undefined
  };
  const cookie = new UplCookie();

  expect(cookie.getLocation()).toEqual(expected);
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
