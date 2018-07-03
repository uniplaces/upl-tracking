/* global ga */
import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';

const URL_PARAMETERS = [
  { name: 'source', defaultValue: 'direct' },
  { name: 'medium', defaultValue: 'organic' },
  { name: 'campaign', defaultValue: null },
  { name: 'term', defaultValue: '' },
  { name: 'content', defaultValue: '' },
  { name: 'gclid', defaultValue: '' },
  { name: 'msclkid', defaultValue: '' },
  { name: 'origin', defaultValue: '' },
  { name: 'destination', defaultValue: '' },
  { name: 'language', defaultValue: '' }
];

/**
 * Creates a new UplCookie
 * @param {string} url If
 * @returns {Object} the UPL cookie
 */
export function init(url, location = { origin: null, destination: null, language: null }) {
  // Get URL parameters
  const params = getUrlParameters(url);

  // Check if user has cookie already
  let uplCookie = getCookie(url, location);

  // If not, create and set new uplCookie
  if (!uplCookie) {
    uplCookie = createCookie();
  }

  // If yes, check document's referrer
  // It's Uniplaces?
  if (isUniplacesReferrer()) {
    // Return same uplCookie
    return uplCookie;
  }

  // It's other
  // Set new uplCookie
  return uplCookie
    .setParameters(params)
    .setLocation(location)
    .save();
}

function createCookie() {
  return new UplCookie();
}

function getCookie() {
  const cookieName = UplCookie.getCookieName();
  const cookie = Cookies.get(cookieName);

  return cookie;
}

export function getUrlParameters(url) {
  const parsedUrl = new URL(url);
  const params = {};

  URL_PARAMETERS.forEach((urlParameter) => {
    let param = parsedUrl.searchParams.get(`upl_${urlParameter.name}`);

    // If the upl_param does not exist, check for the corresponding utm_param
    if (param === null) {
      param = parsedUrl.searchParams.get(`utm_${urlParameter.name}`);
    }

    // Use Google Analytics to try to find something
    if (param === null && hasGoogleAnalytics()) {
      param = null;
    }

    // Set the touch as direct -- use default values
    if (param === null) {
      param = urlParameter.defaultValue;
    }

    params[urlParameter.name] = param;
  });

  return params;
}

function hasGoogleAnalytics() {
  return window.ga && ga.loaded;
}

function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

export function isGoogleReferrer() {
  return isCustomReferrer('google');
}

/**
 *
 *
 */
export function getReferrer() {
  return document.referrer ? new URL(document.referrer) : null;
}

function isCustomReferrer(substring) {
  return document.referrer && document.referrer.includes(substring);
}
