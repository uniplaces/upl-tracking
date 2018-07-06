'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCustomReferrer = exports.isUniplacesReferrer = exports.getReferrer = exports.getInferedMedium = exports.getInferedSource = exports.getUrlParameters = exports.getCookie = exports.ActionsType = exports.setTouch = undefined;

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _uplCookie = require('./upl-cookie');

var _uplCookie2 = _interopRequireDefault(_uplCookie);

var _actionsType = require('./enums/actions-type');

var _actionsType2 = _interopRequireDefault(_actionsType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var URL_PARAMETERS = [{ name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' }, { name: 'medium', inferedValue: getInferedMedium, defaultValue: null }, { name: 'campaign', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'term', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'content', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'gclid', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'msclkid', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }];

/**
 * Creates a new UplCookie
 * @param {string} cookieDomain - the cookie domain to be used
 * @param {Object} location - the location's object
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function setTouch(cookieDomain, location) {
  // Get URL parameters
  var url = window.location.href;
  var params = getUrlParameters(url, location);

  // Check if user has cookie already
  var uplCookie = getCookie();

  // If not, create and set new uplCookie
  if (!uplCookie) {
    uplCookie = new _uplCookie2.default();
  }

  // If yes, check document's referrer
  // It's Uniplaces?
  if (isUniplacesReferrer()) {
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
  var cookieName = _uplCookie2.default.getCookieName();
  var cookie = _jsCookie2.default.getJSON(cookieName);

  return cookie ? _uplCookie2.default.fromJSON(cookie) : null;
}

/**
 * Get the URL parameters
 * @return {Object}
 */
function getUrlParameters(url, location) {
  var parsedUrl = new URL(url);
  var params = {};

  URL_PARAMETERS.forEach(function (urlParameter) {
    var param = parsedUrl.searchParams.get('upl_' + urlParameter.name);

    // If the upl_param does not exist, check for the corresponding utm_param
    if (param === null) {
      param = parsedUrl.searchParams.get('utm_' + urlParameter.name);
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

exports.setTouch = setTouch;
exports.ActionsType = _actionsType2.default;
exports.getCookie = getCookie;
exports.getUrlParameters = getUrlParameters;
exports.getInferedSource = getInferedSource;
exports.getInferedMedium = getInferedMedium;
exports.getReferrer = getReferrer;
exports.isUniplacesReferrer = isUniplacesReferrer;
exports.isCustomReferrer = isCustomReferrer;