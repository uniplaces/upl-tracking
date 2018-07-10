'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUrlParameters = exports.getCookie = exports.ActionsType = exports.assignUserToTrackingId = exports.trackAction = exports.trackTouch = undefined;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _uplCookie = require('./upl-cookie');

var _uplCookie2 = _interopRequireDefault(_uplCookie);

var _actionsType = require('./enums/actions-type');

var _actionsType2 = _interopRequireDefault(_actionsType);

var _userType = require('./enums/user-type');

var _userType2 = _interopRequireDefault(_userType);

var _dateFormatType = require('./enums/date-format-type');

var _dateFormatType2 = _interopRequireDefault(_dateFormatType);

var _dataDeliveryStreamType = require('./enums/data-delivery-stream-type');

var _dataDeliveryStreamType2 = _interopRequireDefault(_dataDeliveryStreamType);

var _dataInfrastructure = require('./services/data-infrastructure');

var _referrer = require('./referrer');

var _urlParameters = require('./url-parameters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Track a new touch or update the existing one
 * @param {string} cookieDomain - the cookie domain to be used
 * @param {Object} location - the location's object
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function trackTouch(cookieDomain, location) {
  var url = window.location.href;
  var params = getUrlParameters(url, location);

  var uplCookie = getCookie();
  if (!uplCookie) {
    uplCookie = new _uplCookie2.default();
  }

  if ((0, _referrer.isUniplacesReferrer)()) {
    return null;
  }

  uplCookie = uplCookie.setParameters(params).setLocation(location).save(cookieDomain);

  return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType2.default.UPL_TOUCHES, uplCookie.toJSON());
}

/**
 *
 */
function trackAction(actionType) {
  var uplCookie = getCookie();
  var record = {
    touch_id: uplCookie.getTouchId(),
    action: actionType,
    created_at: (0, _moment2.default)().format(_dateFormatType2.default.UNIX)
  };

  return !uplCookie ? Promise.reject() : (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType2.default.UPL_ACTIONS, record);
}

/**
 *
 */
function assignUserToTrackingId(userId) {
  var userType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _userType2.default.GUEST;

  var uplCookie = getCookie();
  var record = {
    tracking_id: uplCookie.tracking_id,
    user_type: userType,
    user_id: userId,
    created_at: (0, _moment2.default)().format(_dateFormatType2.default.UNIX)
  };

  return !uplCookie ? Promise.reject() : (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType2.default.UPL_USERS, record);
}

/**
 * Get the current touch (a.k.a. Upl cookie)
 * @returns {(UplCookie|null)}
 */
function getCookie() {
  var cookieName = _uplCookie2.default.getCookieName();
  var cookie = _jsCookie2.default.getJSON(cookieName);

  return cookie ? _uplCookie2.default.fromJSON(cookie) : null;
}

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

  _urlParameters.UrlParameters.forEach(function (urlParameter) {
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

exports.trackTouch = trackTouch;
exports.trackAction = trackAction;
exports.assignUserToTrackingId = assignUserToTrackingId;
exports.ActionsType = _actionsType2.default;
exports.getCookie = getCookie;
exports.getUrlParameters = getUrlParameters;