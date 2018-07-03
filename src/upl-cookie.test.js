import UplCookie from './upl-cookie';

test('it returns the cookie name', () => {
  const expected = 'upl-cookie';
  const result = UplCookie.getCookieName();

  expect(result).toBe(expected);
});

test('it returns the touch ID', () => {
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
    touchId: `${cookie.trackingId}_${cookie.timestamp}`,
    trackingId: cookie.trackingId,
    timestamp: cookie.timestamp
  };

  expect(result).toEqual(expected);
});
