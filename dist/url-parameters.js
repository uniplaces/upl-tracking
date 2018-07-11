'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UrlParameters = undefined;
exports.getUrlParameters = getUrlParameters;
exports.getInferedSource = getInferedSource;
exports.getInferedMedium = getInferedMedium;

var _referrer = require('./referrer');

var UrlParameters = exports.UrlParameters = [{ name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' }, { name: 'medium', inferedValue: getInferedMedium, defaultValue: 'destination_origin_language' }, { name: 'campaign', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: 'city_type' }, { name: 'term', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'content', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'gclid', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'msclkid', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'network', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'keyword', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'matchtype', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'device', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'devicemodel', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'adposition', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'adgroup', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'location', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'creative', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'sitelink', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }];

/**
 * Get URL parameters
 * @param {string} url
 * @param {Object} location
 * @return {Object}
 */
function getUrlParameters(url) {
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parsedUrl = new URL(url);
  var params = {};

  UrlParameters.forEach(function (urlParameter) {
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
  if (!(0, _referrer.hasReferrer)() || (0, _referrer.isUniplacesReferrer)()) {
    return null;
  }

  return (0, _referrer.getReferrer)().host.split('.')[1];
}

/**
 * Get the medium, inferring it from the document.referrer
 * @return {string} the medium infered from the referrer
 */
function getInferedMedium() {
  if (!(0, _referrer.hasReferrer)() || (0, _referrer.isUniplacesReferrer)()) {
    return null;
  }

  return 'organic';
}