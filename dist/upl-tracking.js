(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "moment", "js-cookie", "./upl-cookie", "./services/data-infrastructure", "./referrer", "./url-parameters", "./enums/actions-type", "./enums/user-type", "./enums/environment-type", "./enums/data-delivery-stream-type", "./enums/performance-navigation-type", "./config"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("moment"), require("js-cookie"), require("./upl-cookie"), require("./services/data-infrastructure"), require("./referrer"), require("./url-parameters"), require("./enums/actions-type"), require("./enums/user-type"), require("./enums/environment-type"), require("./enums/data-delivery-stream-type"), require("./enums/performance-navigation-type"), require("./config"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.moment, global.jsCookie, global.uplCookie, global.dataInfrastructure, global.referrer, global.urlParameters, global.actionsType, global.userType, global.environmentType, global.dataDeliveryStreamType, global.performanceNavigationType, global.config);
    global.uplTracking = mod.exports;
  }
})(this, function (_exports, _moment, _jsCookie, _uplCookie, _dataInfrastructure, _referrer, _urlParameters, _actionsType, _userType, _environmentType, _dataDeliveryStreamType, _performanceNavigationType, _config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.setEnvironment = setEnvironment;
  _exports.trackTouch = trackTouch;
  _exports.trackAction = trackAction;
  _exports.assignUserToTrackingId = assignUserToTrackingId;
  _exports.getCookie = getCookie;
  Object.defineProperty(_exports, "getUrlParameters", {
    enumerable: true,
    get: function get() {
      return _urlParameters.getUrlParameters;
    }
  });
  Object.defineProperty(_exports, "ActionsType", {
    enumerable: true,
    get: function get() {
      return _actionsType.default;
    }
  });
  _moment = _interopRequireDefault(_moment);
  _jsCookie = _interopRequireDefault(_jsCookie);
  _uplCookie = _interopRequireDefault(_uplCookie);
  _actionsType = _interopRequireDefault(_actionsType);
  _userType = _interopRequireDefault(_userType);
  _environmentType = _interopRequireDefault(_environmentType);
  _dataDeliveryStreamType = _interopRequireDefault(_dataDeliveryStreamType);
  _performanceNavigationType = _interopRequireDefault(_performanceNavigationType);
  _config = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function setEnvironment() {
    var environment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _environmentType.default.STAGING;

    _config.default.setEnvironment(environment);
  }

  function trackTouch() {
    var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var url = window.location.href;
    var params = (0, _urlParameters.getUrlParameters)(url, location);
    var uplCookie = getCookie();

    if (!uplCookie) {
      uplCookie = new _uplCookie.default();
    }

    if ((0, _referrer.isUniplacesReferrer)() || isPageReload()) {
      return Promise.resolve();
    }

    uplCookie = uplCookie.setParameters(params).setLocation(location).save(_config.default.getCookieDomain());
    return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType.default.UPL_TOUCHES, uplCookie.toJSON());
  }

  function trackAction(actionType) {
    var uplCookie = getCookie();

    if (!uplCookie) {
      return Promise.reject('UPL cookie is not set');
    }

    var record = {
      touch_id: uplCookie.getTouchId(),
      action: actionType,
      created_at: (0, _moment.default)().valueOf()
    };
    return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType.default.UPL_ACTIONS, record);
  }

  function assignUserToTrackingId(userId) {
    var userType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _userType.default.GUEST;
    var uplCookie = getCookie();

    if (!uplCookie) {
      return Promise.reject('UPL cookie is not set');
    }

    var record = {
      tracking_id: uplCookie.tracking_id,
      user_type: userType,
      user_id: userId,
      created_at: (0, _moment.default)().valueOf()
    };
    return (0, _dataInfrastructure.putRecord)(_dataDeliveryStreamType.default.UPL_USERS, record);
  }

  function getCookie() {
    var cookieName = _uplCookie.default.getCookieName();

    var cookie = _jsCookie.default.getJSON(cookieName);

    return cookie ? _uplCookie.default.fromJSON(cookie) : null;
  }

  function isPageReload() {
    return window.performance && window.performance.navigation.type === _performanceNavigationType.default.RELOAD;
  }
});