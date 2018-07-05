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

var _languageType = require('./enums/language-type');

var _languageType2 = _interopRequireDefault(_languageType);

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
     * Get the UplCookie location
     * @return {Object}
     */

  }, {
    key: 'getLocation',
    value: function getLocation() {
      return {
        origin: this.origin,
        destination: this.destination,
        language: this.language
      };
    }

    /**
     * Set the parameters of the cookie
     * @return {UplCookie}
     */

  }, {
    key: 'setParameters',
    value: function setParameters(_ref) {
      var source = _ref.source,
          medium = _ref.medium,
          campaign = _ref.campaign,
          term = _ref.term,
          content = _ref.content,
          gclid = _ref.gclid,
          msclkid = _ref.msclkid;

      this.source = source;
      this.medium = medium;
      this.campaign = campaign;
      this.term = term;
      this.content = content;
      this.gclid = gclid;
      this.msclkid = msclkid;

      return this;
    }

    /**
     * Set the parameters of the cookie
     * @param {Object} location
     * @return {UplCookie}
     */

  }, {
    key: 'setLocation',
    value: function setLocation() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { origin: null, destination: null, language: null };

      var formattedLanguage = _languageType2.default[location.language.replace('-', '_').toUpperCase()];

      this.origin = location.origin;
      this.destination = location.destination;
      this.language = formattedLanguage;

      return this;
    }

    /**
     * Save this cookie as a browser cookie
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
     * Get a new UplCookie from a JSON
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