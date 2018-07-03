'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlParameters = getUrlParameters;

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global window, ga */
const UPL_COOKIE_NAME = 'upl-cookie';
const URL_PARAMETERS = [{ name: 'source', defaultValue: '' }, { name: 'medium', defaultValue: '' }, { name: 'campaign', defaultValue: '' }, { name: 'term', defaultValue: '' }, { name: 'content', defaultValue: '' }, { name: 'gclid', defaultValue: '' }, { name: 'msclkid', defaultValue: '' }, { name: 'origin', defaultValue: '' }, { name: 'destination', defaultValue: '' }, { name: 'language', defaultValue: '' }];

class UplCookie {
  constructor() {}
}

/**
 * Creates a new UplCookie
 * @param {string} url If
 * @returns {Object} the UPL cookie
 */
function init(url, location = { origin: null, destination: null, language: null }) {
  // Check if user has cookie already
  // If not, Creates -- sets new cookie
  // If yes, continues

  // Check referer
  // It's Uniplaces?
  // Return same cookie
  // It's other
  // Set new cookie

  const params = getUrlParameters(url);

  return new UplCookie();
}

function getTrackingId() {
  return (0, _v2.default)();
}

function setCookie(uplCookie) {}

function getCookie() {
  const cookie = _jsCookie2.default.get(UPL_COOKIE_NAME);
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