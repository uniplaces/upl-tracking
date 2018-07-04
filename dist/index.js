'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReferrer = exports.getUrlParameters = exports.setTouch = exports.EventsType = undefined;

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _uplCookie = require('./upl-cookie');

var _uplCookie2 = _interopRequireDefault(_uplCookie);

var _utils = require('./utils');

var _eventsType = require('./enums/events-type');

var _eventsType2 = _interopRequireDefault(_eventsType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global ga */
const URL_PARAMETERS = [{ name: 'source', defaultValue: 'direct' }, { name: 'medium', defaultValue: 'organic' }, { name: 'campaign', defaultValue: null }, { name: 'term', defaultValue: null }, { name: 'content', defaultValue: null }, { name: 'gclid', defaultValue: null }, { name: 'msclkid', defaultValue: null }];

/**
 * Creates a new UplCookie
 * @param {string} url
 * @param {Object} location
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function setTouch(url, location = { origin: null, destination: null, language: null }) {
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

  // It's other
  // Set new uplCookie
  return uplCookie.setParameters(params).setLocation(location).save();
}

function getCookie() {
  const cookieName = _uplCookie2.default.getCookieName();
  const cookie = _jsCookie2.default.get(cookieName);

  return cookie;
}

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
      param = `getInferred${(0, _utils.capitalize)(urlParameter.name)}`();
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