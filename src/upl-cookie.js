import uuidv4 from 'uuid/v4';
import Cookies from 'js-cookie';
import { i18nToUplLocale } from './utils';

const UPL_COOKIE_NAME = 'upl_cookie';
const DEFAULT_EXPIRE_IN_DAYS = 180;

/** Class representing a UPL cookie */
class UplCookie {
  /**
   * Create a UPL cookie
   * @param {string} trackingId - The tracking ID
   * @param {number} createdAt - When was this cookie created
   */
  constructor(trackingId, createdAt) {
    this.tracking_id = trackingId || uuidv4();
    this.created_at = createdAt || Date.now();
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
    return `${this.tracking_id}_${this.created_at}`;
  }

  /**
   * Get the location associated with the cookie
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
   * @param {Object} parameters - The parameters to set
   * @return {UplCookie}
   */
  setParameters(parameters) {
    this.source = parameters.source;
    this.medium = parameters.medium;
    this.campaign = parameters.campaign;
    this.term = parameters.term;
    this.content = parameters.content;
    this.gclid = parameters.gclid;
    this.msclkid = parameters.msclkid;
    this.network = parameters.network;
    this.keyword = parameters.keyword;
    this.match_type = parameters.matchtype;
    this.device = parameters.device;
    this.device_model = parameters.devicemodel;
    this.ad_position = parameters.adposition;
    this.ad_group = parameters.adgroup;
    this.location = parameters.location;
    this.creative = parameters.creative;
    this.site_link = parameters.sitelink;

    return this;
  }

  /**
   * Set the location of the cookie
   * @param {Object} location
   * @return {UplCookie}
   */
  setLocation(location) {
    this.origin = location.origin;
    this.destination = location.destination;
    this.language = i18nToUplLocale(location.language);
    this.city = location.city;

    return this;
  }

  /**
   * Save this cookie in the browser for a given domain
   * @param {string} domain - the domain of the cookie
   * @return {UplCookie}
   */
  save(domain) {
    const data = this.toJSON();
    const options = { domain };

    console.log('Saving cookie...', data, options);

    let months = 6;
    let expireDate = new Date();
    expireDate.setMonth(expireDate.getMonth() + months);

    let cookie = Cookies.set(UPL_COOKIE_NAME, data, { expires: DEFAULT_EXPIRE_IN_DAYS, domain });
    let cookie2 = Cookies.set('cookie2', { cenas: 2 }, { expires: DEFAULT_EXPIRE_IN_DAYS, domain });
    let cookie3 = Cookies.set('cookie3', { cenas: 3 }, { expires: DEFAULT_EXPIRE_IN_DAYS, domain });
    let cookie4 = Cookies.set('cookie4', { cenas: 4 });

    console.log(Cookies);
    console.log('Dummy cookie2:', cookie2, Cookies.get('cookie2'));
    console.log('Dummy cookie3:', cookie3, Cookies.get('cookie3'));
    console.log('Dummy cookie4:', cookie4, Cookies.get('cookie4'));
    console.log('Cookie saved:', cookie, UPL_COOKIE_NAME, Cookies.get(UPL_COOKIE_NAME));

    return this;
  }

  /**
   * Get this class' instance as JSON
   * @return {Object}
   */
  toJSON() {
    return { touch_id: this.getTouchId(), ...this };
  }

  /**
   * Create a new UplCookie from a JSON
   * @param {Object} json - The json containing the information about the cookie
   * @return {UplCookie}
   */
  static fromJSON(json) {
    let cookie = new UplCookie();

    for (let property in json) {
      if (!json.hasOwnProperty(property)) {
        continue;
      }

      cookie[property] = json[property];
    }

    return cookie;
  }
}

export default UplCookie;
