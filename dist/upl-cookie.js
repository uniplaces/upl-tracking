'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UNIX_DATE_FORMAT = 'x';
var UPL_COOKIE_NAME = 'upl_cookie';
var DEFAULT_EXPIRE_IN_DAYS = 180;
var DEFAULT_DOMAIN = '.uniplaces.com';

/** Class representing a UPL cookie */

var UplCookie = function () {
  /**
   * Create a UPL cookie
   * @param {string} trackingId - the trackingId
   * @param {number} timestamp - the timestamp
   */
  function UplCookie(trackingId, timestamp) {
    _classCallCheck(this, UplCookie);

    this.trackingId = trackingId || (0, _v2.default)();
    this.timestamp = timestamp || (0, _moment2.default)().format(UNIX_DATE_FORMAT);
  }

  /**
   * Get the cookie name
   * @return {string}
   */


  _createClass(UplCookie, [{
    key: 'getTouchId',


    /**
     * Get the touch ID
     * @return {string}
     */
    value: function getTouchId() {
      return this.trackingId + '_' + this.timestamp;
    }

    /**
     * Get the location associated with the cookie
     * @return {Object}
     */

  }, {
    key: 'getLocation',
    value: function getLocation() {
      return {
        origin: this.origin,
        destination: this.destination,
        language: this.language,
        city: this.city
      };
    }

    /**
     * Set the parameters of the cookie
     * @param {Object} parameters
     * @return {UplCookie}
     */

  }, {
    key: 'setParameters',
    value: function setParameters(parameters) {
      this.source = parameters.source;
      this.medium = parameters.medium;
      this.campaign = parameters.campaign;
      this.term = parameters.term;
      this.content = parameters.content;
      this.gclid = parameters.gclid;
      this.msclkid = parameters.msclkid;
      this.network = parameters.network;
      this.keyword = parameters.keyword;
      this.matchType = parameters.matchtype;
      this.device = parameters.device;
      this.deviceModel = parameters.devicemodel;
      this.adPosition = parameters.adposition;
      this.adGroup = parameters.adgroup;
      this.location = parameters.location;
      this.creative = parameters.creative;
      this.siteLink = parameters.sitelink;

      return this;
    }

    /**
     * Set the location of the cookie
     * @param {Object} location
     * @return {UplCookie}
     */

  }, {
    key: 'setLocation',
    value: function setLocation() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { origin: null, destination: null, language: null, city: null };

      this.origin = location.origin;
      this.destination = location.destination;
      this.language = (0, _utils.i18nToUplLocale)(location.language);
      this.city = location.city;

      return this;
    }

    /**
     * Save this cookie in the browser for a given domain
     * @param {string} domain - the domain of the cookie
     * @return {UplCookie}
     */

  }, {
    key: 'save',
    value: function save() {
      var domain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_DOMAIN;

      _jsCookie2.default.set(UPL_COOKIE_NAME, this.toJSON(), { expires: DEFAULT_EXPIRE_IN_DAYS, domain: domain });

      return this;
    }

    /**
     * Get this class' instance as JSON
     * @return {Object}
     */

  }, {
    key: 'toJSON',
    value: function toJSON() {
      return _extends({}, this);
    }

    /**
     * Create a new UplCookie from a JSON
     * @param {Object} json - the json containing the information about the cookie
     * @return {UplCookie}
     */

  }], [{
    key: 'getCookieName',
    value: function getCookieName() {
      return UPL_COOKIE_NAME;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var cookie = new UplCookie();

      for (var property in json) {
        if (json.hasOwnProperty(property)) {
          cookie[property] = json[property];
        }
      }

      return cookie;
    }
  }]);

  return UplCookie;
}();

exports.default = UplCookie;