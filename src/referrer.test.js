import { getReferrer, isEmptyReferrer, isUniplacesReferrer } from './referrer';

function _setReferrer(referrer) {
  Object.defineProperty(document, 'referrer', { writable: true, value: referrer });
}

function _clearReferrer() {
  Object.defineProperty(document, 'referrer', { writable: true, value: '' });
}

afterEach(() => {
  _clearReferrer();
});

test('it verifies that the referrer is empty', () => {
  expect(isEmptyReferrer()).toBe(true);
});

test('it verifies that the referrer is not empty', () => {
  const referrer = 'http://www.uniplaces.com/';

  _setReferrer(referrer);

  expect(isEmptyReferrer()).toBe(false);
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

test('it verifies uniplaces is not the referrer when it is empty', () => {
  const result = isUniplacesReferrer();

  expect(result).toBe(false);
});

test('it verifies uniplaces is the referrer on complex urls', () => {
  const referrer = 'https://www.uniplaces.com/pt/accommodation/lisbon/70132?open-registration=yes&utm_source=trovit_display_prospecting_demand&utm_medium=portugal_xx_xx&utm_campaign=xx_generic&utm_content=cpc_native';

  _setReferrer(referrer);

  const result = isUniplacesReferrer();

  expect(result).toBe(true);
});

test('it verifies uniplaces is the referrer on staging urls', () => {
  const referrer = 'https://www.staging-uniplaces.com/pt/accommodation/lisbon/70132';

  _setReferrer(referrer);

  const result = isUniplacesReferrer();

  expect(result).toBe(true);
});

test('it verifies uniplaces is the referrer on sub-domains', () => {
  const referrer = 'https://rent.uniplaces.com?open-registration=yes&utm_source=trovit_display_prospecting_demand&utm_medium=portugal_xx_xx&utm_campaign=xx_generic&utm_content=cpc_native';

  _setReferrer(referrer);

  const result = isUniplacesReferrer();

  expect(result).toBe(true);
});

test('it verifies uniplaces is not the referrer on encoded urls (e.g. trovit ones)', () => {
  const referrer = 'http://casa.trovit.pt/index.php/cod.interm/url.https%253A%252F%252Fwww.uniplaces.com%252Fpt%252Faccommodation%252Flisbon%252F70132%253Fopen-registration%253Dyes%2526utm_source%253Dtrovit_display_prospecting_demand%2526utm_medium%253Dportugal_xx_xx%2526utm_campaign%253Dxx_generic%2526utm_content%253Dcpc_native/id.4181u1y1Z1y1Qr/origin.0/section.186/section_type.1/timeout.0/type.2/';

  _setReferrer(referrer);

  const result = isUniplacesReferrer();

  expect(result).toBe(false);
});
