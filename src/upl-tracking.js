import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';
import EventsType from './enums/events-type';

const URL_PARAMETERS = [
  { name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' },
  { name: 'medium', inferedValue: getInferedMedium, defaultValue: null },
  { name: 'campaign', inferedValue: getInferedCampaign, defaultValue: null },
  { name: 'term', inferedValue: () => null, defaultValue: null },
  { name: 'content', inferedValue: () => null, defaultValue: null },
  { name: 'gclid', inferedValue: () => null, defaultValue: null },
  { name: 'msclkid', inferedValue: () => null, defaultValue: null }
];

/**
 * Creates a new UplCookie
 * @param {string} cookieDomain - the cookie domain to be used
 * @param {Object} location - the location's object
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function setTouch(cookieDomain, location) {
  // Get URL parameters
  const url = window.location.href;
  const params = getUrlParameters(url, location);

  // Check if user has cookie already
  let uplCookie = getCookie();

  // If not, create and set new uplCookie
  if (!uplCookie) {
    uplCookie = new UplCookie();
  }

  // If yes, check document's referrer
  // It's Uniplaces?
  if (!isUniplacesReferrer()) {
    // Return same uplCookie
    return null;
  }

  // Id it's other, set new parameters and save
  return uplCookie
    .setParameters(params)
    .setLocation(location)
    .save(cookieDomain);
}

/**
 * Get the Upl Cookie
 * @return {UplCookie} the Upl Cookie JSON
 */
function getCookie() {
  const cookieName = UplCookie.getCookieName();
  const cookie = Cookies.getJSON(cookieName);

  return cookie ? UplCookie.fromJSON(cookie) : null;
}

/**
 * Get the URL parameters
 * @return {Object}
 */
function getUrlParameters(url, location) {
  const parsedUrl = new URL(url);
  const params = {};

  URL_PARAMETERS.forEach((urlParameter) => {
    let param = parsedUrl.searchParams.get(`upl_${urlParameter.name}`);

    // If the upl_param does not exist, check for the corresponding utm_param
    if (param === null) {
      param = parsedUrl.searchParams.get(`utm_${urlParameter.name}`);
    }

    // Use Google Analytics to try to find something
    if (param === null) {
      param = urlParameter.inferedValue(url, location);
    }

    // Set the touch as direct -- use default values
    if (param === null) {
      param = urlParameter.defaultValue;
    }

    params[urlParameter.name] = param;
  });

  return params;
}

/**
 * Get the source, inferring it from the document.referrer
 * @return {string} the source infered from the referrer
 */
function getInferedSource() {
  if (!hasReferrer() || isUniplacesReferrer()) {
    return null;
  }

  return getReferrer().host.split('.')[1];
}

/**
 * Get the medium, inferring it from the document.referrer
 * @param {string} url
 * @param {Object} location
 * @return {string} the medium infered from the referrer
 */
function getInferedMedium(_, location) {
  const { origin, destination, language } = location;
  const placeholder = 'xxx';

  if (!hasReferrer() || isUniplacesReferrer()) {
    return null;
  }

  if (origin || destination || language) {
    return `${origin || placeholder}_${destination || placeholder}_${language || placeholder}`;
  }

  return 'organic';
}

/**
 * Get the campaign, inferring it from the location's city
 * @param {string} url
 * @param {Object} location
 * @return {string} the medium infered from the location's city
 */
function getInferedCampaign(_, location) {
  const { city } = location;
  if (!hasReferrer() || isUniplacesReferrer() || !city) {
    return null;
  }

  return `${city}_generic`;
}

/**
 * Check if it exists a document.referrer
 * @return {boolean} If there is a referrer
 */
function hasReferrer() {
  return document.referrer && document.referrer !== '';
}

/**
 * Get the document's referrer as URL
 * @return {(URL|null)} The URL object with the referrer or null if there is no referrer
 */
function getReferrer() {
  return hasReferrer() ? new URL(document.referrer) : null;
}

/**
 *
 */
function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

/**
 *
 */
function isCustomReferrer(substring) {
  return hasReferrer() && document.referrer.includes(substring);
}

export {
  setTouch,
  EventsType,
  getCookie,
  getUrlParameters,
  getInferedSource,
  getInferedMedium,
  getInferedCampaign,
  getReferrer,
  isUniplacesReferrer,
  isCustomReferrer
};
