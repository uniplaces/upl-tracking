'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cookies = exports.config = exports.EnvironmentType = exports.getUrlParameters = exports.getCookie = exports.ActionsType = exports.assignUserToTrackingId = exports.trackAction = exports.trackTouch = exports.setEnvironment = undefined;

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _uplCookie = require('./upl-cookie');

var _uplCookie2 = _interopRequireDefault(_uplCookie);

var _dataInfrastructure = require('./services/data-infrastructure');

var _referrer = require('./referrer');

var _urlParameters = require('./url-parameters');

var _actionsType = require('./enums/actions-type');

var _actionsType2 = _interopRequireDefault(_actionsType);

var _userType = require('./enums/user-type');

var _userType2 = _interopRequireDefault(_userType);

var _environmentType = require('./enums/environment-type');

var _environmentType2 = _interopRequireDefault(_environmentType);

var _dataDeliveryStreamType = require('./enums/data-delivery-stream-type');

var _dataDeliveryStreamType2 = _interopRequireDefault(_dataDeliveryStreamType);

var _performanceNavigationType = require('./enums/performance-navigation-type');

var _performanceNavigationType2 = _interopRequireDefault(_performanceNavigationType);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function setEnvironment() {
  var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _environmentType2.default.STAGING;

  _config2.default.setEnvironment(environment);
}

function trackTouch() {
  var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { origin: null, destination: null, language: null, city: null };

  var url = window.location.href;
  var params = (0, _urlParameters.getUrlParameters)(url, location);

  var uplCookie = getCookie();
  if (!uplCookie) {
    uplCookie = new _uplCookie2.default();
  }

  if ((0, _referrer.isUniplacesReferrer)() || isPageReload()) {
    return Promise.resolve({ msg: 'User is coming from another Uniplaces or from a page reload' });
  }

  uplCookie = uplCookie.setParameters(params).setLocation(location).save(_config2.default.getCookieDomain());

  return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType2.default.UPL_TOUCHES, uplCookie.toJSON());
}

function trackAction(actionType) {
  var uplCookie = getCookie();

  if (!uplCookie) {
    return Promise.reject({ msg: 'UPL cookie is not set' });
  }

  var record = {
    touch_id: uplCookie.getTouchId(),
    action: actionType,
    created_at: Date.now()
  };

  return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType2.default.UPL_ACTIONS, record);
}

function assignUserToTrackingId(userId) {
  var userType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _userType2.default.GUEST;

  var uplCookie = getCookie();

  if (!uplCookie) {
    return Promise.reject({ msg: 'UPL cookie is not set' });
  }

  var record = {
    tracking_id: uplCookie.tracking_id,
    user_type: userType,
    user_id: userId,
    created_at: Date.now()
  };

  return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType2.default.UPL_USERS, record);
}

function getCookie() {
  var cookieName = _uplCookie2.default.getCookieName();
  var cookie = _jsCookie2.default.getJSON(cookieName);

  return cookie ? _uplCookie2.default.fromJSON(cookie) : null;
}

function isPageReload() {
  if (_config2.default.isDevelopment()) {
    return false;
  }

  return window.performance && window.performance.navigation.type === _performanceNavigationType2.default.RELOAD;
}

exports.setEnvironment = setEnvironment;
exports.trackTouch = trackTouch;
exports.trackAction = trackAction;
exports.assignUserToTrackingId = assignUserToTrackingId;
exports.ActionsType = _actionsType2.default;
exports.getCookie = getCookie;
exports.getUrlParameters = _urlParameters.getUrlParameters;
exports.EnvironmentType = _environmentType2.default;
exports.config = _config2.default;
exports.Cookies = _jsCookie2.default;