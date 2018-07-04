/* global ga */
import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';

const URL_PARAMETERS = [
  { name: 'source', defaultValue: 'direct' },
  { name: 'medium', defaultValue: 'organic' },
  { name: 'campaign', defaultValue: null },
  { name: 'term', defaultValue: null },
  { name: 'content', defaultValue: null },
  { name: 'gclid', defaultValue: null },
  { name: 'msclkid', defaultValue: null }
];

/**
 * Creates a new UplCookie
 * @param {string} url
 * @param {Object} location
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
export function setTouch(url, location = { origin: null, destination: null, language: null }) {
  // Get URL parameters
  const params = getUrlParameters(url);

  // Check if user has cookie already
  let uplCookie = getCookie(url, location);

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

  // It's other
  // Set new uplCookie
  return uplCookie
    .setParameters(params)
    .setLocation(location)
    .save();
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

/**
 * Get the document's referrer as URL
 * @return {(URL|null)} The URL object with the referrer or null if there is no referrer
 */
export function getReferrer() {
  return document.referrer ? new URL(document.referrer) : null;
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

function isCustomReferrer(substring) {
  return document.referrer && document.referrer.includes(substring);
}
