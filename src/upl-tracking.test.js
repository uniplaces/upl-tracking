import { getUrlParameters, ActionsType } from './upl-tracking';

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
  const url = 'https://www.uniplaces.com/accommodation/lisbon?utm_source=google&utm_campaign=campaign_1&utm_medium=this-is-a-medium';
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

test('it exports the events type enumerable', () => {
  const expected = 'sign-up';
  const result = ActionsType.SIGN_UP;

  expect(result).toBe(expected);
});
