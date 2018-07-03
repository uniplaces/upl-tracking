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
  constructor(trackingId = uuidv4(), timestamp = moment().format(UNIX_DATE_FORMAT)) {
    this.tracking_id = trackingId;
    this.timestamp = timestamp;

    return this;
  }

  static getCookieName() {
    return UPL_COOKIE_NAME;
  }

  get touchId() {
    return `${this.tracking_id}_${this.timestamp}`;
  }

  /**
   * Get the UplCookie location
   * @return
   */
  get location() {
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
    Cookies.set(UPL_COOKIE_NAME, this.toJSON());

    return this;
  }

  toJSON() {
    return JSON.stringify(this);
  }
}
