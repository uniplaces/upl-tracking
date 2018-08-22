'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlParameters = getUrlParameters;
exports.getInferedSource = getInferedSource;
exports.getInferedMedium = getInferedMedium;

var _referrer = require('./referrer');

var _urlSearchParams = require('url-search-params');

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PrefixedUrlParameters = [{ name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' }, { name: 'medium', inferedValue: getInferedMedium, defaultValue: 'destination_origin_language' }, { name: 'campaign', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: 'city_type' }, { name: 'term', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }, { name: 'content', inferedValue: function inferedValue() {
    return null;
  }, defaultValue: null }];

var UrlParameters = [{ name: 'gclid', inferedValue: function inferedValue() {
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

function getUrlParameters(url) {
  var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { origin: null, destination: null, language: null };

  var parsedUrl = new URL(url);
  var params = {};

  var searchParams = parsedUrl.searchParams || new _urlSearchParams2.default(parsedUrl.search);

  PrefixedUrlParameters.forEach(function (urlParameter) {
    params[urlParameter.name] = searchParams.get('upl_' + urlParameter.name) || searchParams.get('utm_' + urlParameter.name) || urlParameter.inferedValue(url, location) || urlParameter.defaultValue;
  });

  UrlParameters.forEach(function (urlParameter) {
    params[urlParameter.name] = searchParams.get(urlParameter.name) || urlParameter.inferedValue(url, location) || urlParameter.defaultValue;
  });

  return params;
}

function getInferedSource() {
  if ((0, _referrer.isEmptyReferrer)() || (0, _referrer.isUniplacesReferrer)()) {
    return null;
  }

  var source = (0, _referrer.getReferrer)().host.split('.')[1];
  var affix = 'organic';

  return source + '_' + affix;
}

function getInferedMedium(_, location) {
  var origin = location.origin,
      destination = location.destination,
      language = location.language;

  var placeholder = 'xxx';

  if (location.origin || location.destination || location.language) {
    return (origin || placeholder) + '_' + (destination || placeholder) + '_' + (language || placeholder);
  }

  return 'organic';
}