import uuidv4 from 'uuid/v4';
import moment from 'moment';

const UNIX_DATE_FORMAT = 'x';

/** Class representing a UPL cookie */
export default class UplCookie {
  /**
   * Create a UPL cookie
   */
  constructor() {
    this.tracking_id = uuidv4();
    this.timestamp = moment().format(UNIX_DATE_FORMAT);
    this.touch_id = `${this.tracking_id}_${this.timestamp}`;
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

  }

  /**
   * Set the parameters of the cookie
   * @param {Object} location
   */
  setLocation(location = { origin: null, destination: null, language: null }) {
    this.origin = location.origin;
    this.destination = location.destination;
    this.language = location.language;
  }
}
