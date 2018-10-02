import Cookies from 'js-cookie';
import ImpactRadiusCookie from './cookie';

jest.mock('js-cookie');

test('it constructs an impact radius cookie', () => {
  const clickId = 'this-is-a-click-id';
  const result = new ImpactRadiusCookie(clickId);

  expect(result.click_id).toBeDefined();
  expect(result.click_id).toBe(clickId);
});

test('it returns the cookie name', () => {
  const expected = 'impact_radius_cookie';
  const result = ImpactRadiusCookie.getCookieName();

  expect(result).toBe(expected);
});

test('it sets the click ID', () => {
  const clickId = '123456789-abc';
  const cookie = new ImpactRadiusCookie();

  cookie.setClickId(clickId);

  expect(cookie.getClickId()).toBe(clickId);
});

test('it saves the cookie in Cookies', () => {
  const cookie = new ImpactRadiusCookie('123-456');
  const result = cookie.save('.uniplaces.com');

  const expectedCookieName = 'impact_radius_cookie';
  const expectedCookieJson = { click_id: '123-456' };
  const expectedOptions = { expires: 5, domain: '.uniplaces.com' };

  expect(result).toBeDefined();
  expect(Cookies.set).toHaveBeenCalledTimes(1);
  expect(Cookies.set).toHaveBeenCalledWith(expectedCookieName, expectedCookieJson, expectedOptions);
});

test('it returns a new instance from a JSON', () => {
  const result = ImpactRadiusCookie.fromJSON({ click_id: '123-456-789-0' });
  const expected = { click_id: '123-456-789-0' };

  expect(result).toEqual(expected);
});
