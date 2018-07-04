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
const DEFAULT_EXPIRE_IN_DAYS = 180;
const DEFAULT_DOMAIN = '.uniplaces.com';

/** Class representing a UPL cookie */
class UplCookie {
  /**
   * Create a UPL cookie
   * @param {string} trackingId - the trackingId
   * @param {number} timestamp - the timestamp
   */
  constructor(trackingId, timestamp) {
    this.trackingId = trackingId || (0, _v2.default)();
    this.timestamp = timestamp || (0, _moment2.default)().format(UNIX_DATE_FORMAT);
  }

  /**
   * Get the cookie name
   * @return {string}
   */
  static getCookieName() {
    return UPL_COOKIE_NAME;
  }

  /**
   * Get the touch ID
   * @return {string}
   */
  getTouchId() {
    return `${this.trackingId}_${this.timestamp}`;
  }

  /**
   * Get the UplCookie location
   * @return {Object}
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
   * @return {UplCookie}
   */
  setParameters({ source, medium, campaign, term, content, gclid, msclkid }) {
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
  setLocation(location = { origin: null, destination: null, language: null }) {
    this.origin = location.origin;
    this.destination = location.destination;
    this.language = location.language;

    return this;
  }

  /**
   * Save this cookie as a browser cookie
   * @param {string} domain - the domain of the cookie
   * @return {UplCookie}
   */
  save(domain = DEFAULT_DOMAIN) {
    _jsCookie2.default.set(UPL_COOKIE_NAME, this.toJSON(), { expires: DEFAULT_EXPIRE_IN_DAYS, domain });

    return this;
  }

  /**
   * Get this class' instance as JSON
   * @return {Object}
   */
  toJSON() {
    return _extends({}, this);
  }

  /**
   * Get a new UplCookie from a JSON
   * @param {Object} json - the json containing the information about the cookie
   * @return {UplCookie}
   */
  static fromJSON(json) {
    let cookie = new UplCookie();

    for (let property in json) {
      if (json.hasOwnProperty(property)) {
        cookie[property] = json[property];
      }
    }

    return cookie;
  }
}
exports.default = UplCookie;