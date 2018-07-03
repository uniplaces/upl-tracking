'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UNIX_DATE_FORMAT = 'x';
const UPL_COOKIE_NAME = 'upl-cookie';

/** Class representing a UPL cookie */
class UplCookie {
  /**
   * Create a UPL cookie
   */
  constructor() {
    this.trackingId = (0, _v2.default)();
    this.timestamp = (0, _moment2.default)().format(UNIX_DATE_FORMAT);

    return this;
  }

  static getCookieName() {
    return UPL_COOKIE_NAME;
  }

  getTouchId() {
    return `${this.trackingId}_${this.timestamp}`;
  }

  /**
   * Get the UplCookie location
   * @return
   */
  getLocation() {
    return {
      origin: this.origin,
      destination: this.destination,
      language: this.language
    };
  }

  /**
   * Set the parameters of the cookie
   */
  setParameters() {
    return this;
  }

  /**
   * Set the parameters of the cookie
   * @param {Object} location
   */
  setLocation(location = { origin: null, destination: null, language: null }) {
    this.origin = location.origin;
    this.destination = location.destination;
    this.language = location.language;

    return this;
  }

  save() {
    _jsCookie2.default.set(UPL_COOKIE_NAME, '');

    return this;
  }

  toJSON() {
    return JSON.stringify(_extends({}, this, { touchId: this.getTouchId() }));
  }
}
exports.default = UplCookie;