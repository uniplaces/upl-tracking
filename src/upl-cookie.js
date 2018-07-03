import uuidv4 from 'uuid/v4';
import moment from 'moment';
import Cookies from 'js-cookie';

const UNIX_DATE_FORMAT = 'x';
const UPL_COOKIE_NAME = 'upl-cookie';

/** Class representing a UPL cookie */
export default class UplCookie {
  /**
   * Create a UPL cookie
   */
  constructor() {
    this.trackingId = uuidv4();
    this.timestamp = moment().format(UNIX_DATE_FORMAT);

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
   *
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

  /**
   * Save this cookie as a browser cookie
   * @return {UplCookie} this cookie
   */
  save() {
    Cookies.set(UPL_COOKIE_NAME, this.toJSON());

    return this;
  }

  /**
   * Get this class' instance as JSON
   * @return {Object}
   */
  toJSON() {
    return { ...this, touchId: this.getTouchId() };
  }
}
