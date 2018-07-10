import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';
import ActionsType from './enums/actions-type';

const URL_PARAMETERS = [
  { name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' },
  { name: 'medium', inferedValue: getInferedMedium, defaultValue: 'destination_origin_language' },
  { name: 'campaign', inferedValue: () => null, defaultValue: 'city_type' },
  { name: 'term', inferedValue: () => null, defaultValue: null },
  { name: 'content', inferedValue: () => null, defaultValue: null },
  { name: 'gclid', inferedValue: () => null, defaultValue: null },
  { name: 'msclkid', inferedValue: () => null, defaultValue: null },
  { name: 'network', inferedValue: () => null, defaultValue: null },
  { name: 'keyword', inferedValue: () => null, defaultValue: null },
  { name: 'matchtype', inferedValue: () => null, defaultValue: null },
  { name: 'device', inferedValue: () => null, defaultValue: null },
  { name: 'devicemodel', inferedValue: () => null, defaultValue: null },
  { name: 'adposition', inferedValue: () => null, defaultValue: null },
  { name: 'adgroup', inferedValue: () => null, defaultValue: null },
  { name: 'location', inferedValue: () => null, defaultValue: null },
  { name: 'creative', inferedValue: () => null, defaultValue: null },
  { name: 'sitelink', inferedValue: () => null, defaultValue: null }
];

/**
 * Set a new touch or update the existing one
 * @param {string} cookieDomain - the cookie domain to be used
 * @param {Object} location - the location's object
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function setTouch(cookieDomain, location) {
  const url = window.location.href;
  const params = getUrlParameters(url, location);

  let uplCookie = getCookie();
  if (!uplCookie) {
    uplCookie = new UplCookie();
  }

  if (isUniplacesReferrer()) {
    return null;
  }

  return uplCookie
    .setParameters(params)
    .setLocation(location)
    .save(cookieDomain);
}

/**
 * Get the current touch (a.k.a. Upl cookie)
 * @returns {(UplCookie|null)}
 */
function getCookie() {
  const cookieName = UplCookie.getCookieName();
  const cookie = Cookies.getJSON(cookieName);

  return cookie ? UplCookie.fromJSON(cookie) : null;
}

/**
 * Get URL parameters
 * @param {string} url
 * @param {Object} location
 * @return {Object}
 */
function getUrlParameters(url, location = {}) {
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
 * @return {string} the medium infered from the referrer
 */
function getInferedMedium() {
  if (!hasReferrer() || isUniplacesReferrer()) {
    return null;
  }

  return 'organic';
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
 * Check if the referrer is Uniplaces
 * @return {boolean}
 */
function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

/**
 * Check if the referrer exists and contains a substring
 * @param {string} substring
 * @return {boolean}
 */
function isCustomReferrer(substring) {
  return hasReferrer() && document.referrer.includes(substring);
}

export {
  setTouch,
  ActionsType,
  getCookie,
  getUrlParameters,
  getInferedSource,
  getInferedMedium,
  getReferrer,
  isUniplacesReferrer,
  isCustomReferrer
};
