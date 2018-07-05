import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Cookies from 'js-cookie';
import { i18nToUplLocale } from './utils';

const UNIX_DATE_FORMAT = 'x';
const UPL_COOKIE_NAME = 'upl_cookie';
const DEFAULT_EXPIRE_IN_DAYS = 180;
const DEFAULT_DOMAIN = '.uniplaces.com';

/** Class representing a UPL cookie */
export default class UplCookie {
  /**
   * Create a UPL cookie
   * @param {string} trackingId - the trackingId
   * @param {number} timestamp - the timestamp
   */
  constructor(trackingId, timestamp) {
    this.trackingId = trackingId || uuidv4();
    this.timestamp = timestamp || moment().format(UNIX_DATE_FORMAT);
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
      language: this.language,
      city: this.city
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
  setLocation(location = { origin: null, destination: null, language: null, city: null }) {
    this.origin = location.origin;
    this.destination = location.destination;
    this.language = i18nToUplLocale(location.language);
    this.city = location.city;

    return this;
  }

  /**
   * Save this cookie as a browser cookie
   * @param {string} domain - the domain of the cookie
   * @return {UplCookie}
   */
  save(domain = DEFAULT_DOMAIN) {
    Cookies.set(UPL_COOKIE_NAME, this.toJSON(), { expires: DEFAULT_EXPIRE_IN_DAYS, domain });

    return this;
  }

  /**
   * Get this class' instance as JSON
   * @return {Object}
   */
  toJSON() {
    return { ...this };
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
