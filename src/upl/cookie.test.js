import Cookies from 'js-cookie';
import UplCookie from './cookie';

jest.mock('js-cookie');

test('it constructs a upl cookie with default tracking id and created_at', () => {
  const result = new UplCookie();

  expect(result.tracking_id).toBeDefined();
  expect(result.created_at).toBeDefined();
});

test('it constructs a upl cookie with custom tracking id and created_at', () => {
  const result = new UplCookie('123-456-789', 150000000);

  expect(result.tracking_id).toBeDefined();
  expect(result.tracking_id).toBe('123-456-789');
  expect(result.created_at).toBeDefined();
  expect(result.created_at).toBe(150000000);
});

test('it returns the cookie name', () => {
  const expected = 'upl_cookie';
  const result = UplCookie.getCookieName();

  expect(result).toBe(expected);
});

test('it returns the cookie touch ID', () => {
  const cookie = new UplCookie();
  const expected = `${cookie.tracking_id}_${cookie.created_at}`;
  const result = cookie.getTouchId();

  expect(result).toBe(expected);
});

test('it returns the location', () => {
  const cookie = new UplCookie();
  const expected = {
    destination: undefined,
    origin: undefined,
    language: undefined,
    city: undefined
  };
  const result = cookie.getLocation();

  expect(result).toEqual(expected);
});

test('it sets the parameters', () => {
  const cookie = new UplCookie('1', 2);
  const expected = {
    tracking_id: '1',
    created_at: 2,
    source: 'source',
    medium: 'medium',
    campaign: 'campaign',
    term: 'term',
    content: 'content',
    gclid: 'gclid',
    fbclid: 'fbclid',
    msclkid: 'msclkid',
    match_type: 'matchtype',
    tduid: 'tduid'
  };
  const result = cookie.setParameters({
    source: 'source',
    medium: 'medium',
    campaign: 'campaign',
    term: 'term',
    content: 'content',
    gclid: 'gclid',
    fbclid: 'fbclid',
    msclkid: 'msclkid',
    matchtype: 'matchtype',
    tduid: 'tduid',
    nonSpecifiedParameter: 'this-will-not-be-saved'
  });

  expect(result).toEqual(expected);
});

test('it sets the new location', () => {
  const cookie = new UplCookie('123-456', 1000000);
  const expected = {
    tracking_id: '123-456',
    created_at: 1000000,
    origin: 'portugal',
    destination: 'barcelona',
    language: 'portuguese',
    city: 'lisbon'
  };
  const result = cookie.setLocation({
    origin: 'portugal',
    destination: 'barcelona',
    language: 'pt-pt',
    city: 'lisbon'
  });

  expect(result).toEqual(expected);
});

test('it saves the cookie in Cookies', () => {
  const cookie = new UplCookie('123-456', 150000);
  const result = cookie.save('.uniplaces.com');

  const expectedCookieName = 'upl_cookie';
  const expectedCookieJson = {
    tracking_id: '123-456',
    created_at: 150000,
    touch_id: '123-456_150000'
  };
  const expectedOptions = {
    expires: 180,
    domain: '.uniplaces.com'
  };

  expect(result).toBeDefined();
  expect(Cookies.set).toHaveBeenCalledTimes(1);
  expect(Cookies.set).toHaveBeenCalledWith(expectedCookieName, expectedCookieJson, expectedOptions);
});

test('it returns as JSON', () => {
  const cookie = new UplCookie();
  cookie
    .setParameters({
      source: 'source',
      medium: 'medium',
      campaign: 'campaign',
      term: 'term',
      content: 'content',
      gclid: 'gclid',
      fbclid: 'fbclid',
      msclkid: 'msclkid',
      matchtype: 'matchtype',
    })
    .setLocation({
      origin: 'portugal',
      destination: 'barcelona',
      language: 'pt-pt',
      city: 'lisbon'
    });

  const result = cookie.toJSON();
  const expected = {
    tracking_id: cookie.tracking_id,
    created_at: cookie.created_at,
    touch_id: `${cookie.tracking_id}_${cookie.created_at}`,
    city: cookie.city,
    destination: cookie.destination,
    language: cookie.language,
    origin: cookie.origin,
    ad_group: cookie.ad_group,
    ad_position: cookie.ad_position,
    campaign: cookie.campaign,
    content: cookie.content,
    creative: cookie.creative,
    device: cookie.device,
    device_model: cookie.device_model,
    gclid: cookie.gclid,
    fbclid: cookie.fbclid,
    keyword: cookie.keyword,
    location: cookie.location,
    match_type: cookie.match_type,
    medium: cookie.medium,
    msclkid: cookie.msclkid,
    network: cookie.network,
    site_link: cookie.site_link,
    source: cookie.source,
    term: cookie.term,
    tduid: cookie.tduid
  };

  expect(result).toEqual(expected);
});

test('it returns a new instance from a JSON', () => {
  const result = UplCookie.fromJSON({
    tracking_id: 1,
    created_at: 15498090,
    source: 'cenas',
    medium: 'cenas-2'
  });
  const expected = {
    tracking_id: 1,
    created_at: 15498090,
    source: 'cenas',
    medium: 'cenas-2'
  };

  expect(result).toEqual(expected);
});

test('it refreshes the timestamp', () => {
  const createdAt = 15498090;
  const result = UplCookie
    .fromJSON({
      tracking_id: 1,
      created_at: createdAt,
      source: 'cenas',
      medium: 'cenas-2'
    })
    .refreshTimestamp();

  expect(result.getCreatedAt()).not.toBe(createdAt);
  expect(result.getTouchId()).toBe(`1_${result.getCreatedAt()}`);
});
