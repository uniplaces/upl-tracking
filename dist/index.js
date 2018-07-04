'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInferedMedium = exports.getInferedSource = exports.getReferrer = exports.getUrlParameters = exports.setTouch = exports.EventsType = undefined;

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _uplCookie = require('./upl-cookie');

var _uplCookie2 = _interopRequireDefault(_uplCookie);

var _utils = require('./utils');

var _eventsType = require('./enums/events-type');

var _eventsType2 = _interopRequireDefault(_eventsType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global ga */
const URL_PARAMETERS = [{ name: 'source', defaultValue: 'direct' }, { name: 'medium', defaultValue: null }, { name: 'campaign', defaultValue: null }, { name: 'term', defaultValue: null }, { name: 'content', defaultValue: null }, { name: 'gclid', defaultValue: null }, { name: 'msclkid', defaultValue: null }];

/**
 * Creates a new UplCookie
 * @param {string} url - the complete url
 * @param {Object} location - the location's object
 * @param {string} cookieDomain - the cookie domain to be used
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function setTouch(url, location, cookieDomain) {
  // Get URL parameters
  const params = getUrlParameters(url);

  // Check if user has cookie already
  let uplCookie = getCookie(url, location);

  // If not, create and set new uplCookie
  if (!uplCookie) {
    uplCookie = new _uplCookie2.default();
  }

  // If yes, check document's referrer
  // It's Uniplaces?
  if (!isUniplacesReferrer()) {
    // Return same uplCookie
    return null;
  }

  // Id it's other, set new parameters and save
  return uplCookie.setParameters(params).setLocation(location).save(cookieDomain);
}

/**
 * Get the Upl Cookie
 * @return {UplCookie} the Upl Cookie JSON
 */
function getCookie() {
  const cookieName = _uplCookie2.default.getCookieName();
  const cookie = _jsCookie2.default.getJSON(cookieName);

  // @TODO: convert JSON in UplCookie instance

  return cookie;
}

/**
 * Get the URL parameters
 * @return {Object}
 */
function getUrlParameters(url) {
  const parsedUrl = new URL(url);
  const params = {};

  URL_PARAMETERS.forEach(urlParameter => {
    let param = parsedUrl.searchParams.get(`upl_${urlParameter.name}`);

    // If the upl_param does not exist, check for the corresponding utm_param
    if (param === null) {
      param = parsedUrl.searchParams.get(`utm_${urlParameter.name}`);
    }

    // Use Google Analytics to try to find something
    if (param === null && hasGoogleAnalytics()) {
      param = `getInfered${(0, _utils.capitalize)(urlParameter.name)}`() || null;
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
  let referrer = getReferrer();

  return referrer ? referrer.host.split('.')[1] : null;
}

/**
 * Get the medium, inferring it from the document.referrer
 * @return {string} the medium infered from the referrer
 */
function getInferedMedium() {
  return !getReferrer() ? null : 'organic';
}

/**
 * Get the document's referrer as URL
 * @return {(URL|null)} The URL object with the referrer or null if there is no referrer
 */
function getReferrer() {
  return document.referrer ? new URL(document.referrer) : null;
}

function hasGoogleAnalytics() {
  return window.ga && ga.loaded;
}

function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

function isCustomReferrer(substring) {
  return document.referrer && document.referrer.includes(substring);
}

exports.EventsType = _eventsType2.default;
exports.setTouch = setTouch;
exports.getUrlParameters = getUrlParameters;
exports.getReferrer = getReferrer;
exports.getInferedSource = getInferedSource;
exports.getInferedMedium = getInferedMedium;