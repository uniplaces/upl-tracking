import { getUrlParameters, getReferrer } from './index';

test('it parses upl parameters correctly', () => {
  const url = 'https://www.uniplaces.com/accommodation/lisbon?upl_source=google&upl_campaign=campaign_1&upl_medium=this-is-a-medium';
  const expected = {
    source: 'google',
    campaign: 'campaign_1',
    medium: 'this-is-a-medium',
    content: '',
    destination: '',
    gclid: '',
    language: '',
    msclkid: '',
    origin: '',
    term: ''
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
    content: '',
    destination: '',
    gclid: '',
    language: '',
    msclkid: '',
    origin: '',
    term: ''
  };
  const result = getUrlParameters(url);

  expect(result).toEqual(expected);
});

test('it returns the referrer as URL', () => {
  const referrer = 'http://www.uniplaces.com/';

  Object.defineProperty(document, 'referrer', { writable: true, value: referrer });

  const result = getReferrer();

  Object.defineProperty(document, 'referrer', { writable: false, value: null });

  expect(result.href).toBe(referrer);
  expect(result.host).toBe('www.uniplaces.com');
});

test('it returns null when there is no referrer', () => {
  const result = getReferrer();

  expect(result).toBe(null);
});
