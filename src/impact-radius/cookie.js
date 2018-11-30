import Cookies from 'js-cookie';

var IMPACT_RADIUS_COOKIE_NAME = 'impact_radius_cookie';
var DEFAULT_EXPIRE_IN_DAYS = 5;

/** Class representing an Impact Radius cookie */
class ImpactRadiusCookie {
  /**
   * Create a Impact Radius cookie
   * @param {string} clickId - The click ID
   */
  constructor(clickId) {
    this.click_id = clickId;
  }

  /**
   * Get the cookie name
   * @return {string}
   */
  static getCookieName() {
    return IMPACT_RADIUS_COOKIE_NAME;
  }

  /**
   * Get the click ID
   * @return {string}
   */
  getClickId() {
    return this.click_id;
  }

  /**
   * Set the click ID
   * @param {string} clickId - the click ID
   * @return {impactRadiusCookie}
   */
  setClickId(clickId) {
    this.click_id = clickId;

    return this;
  }

  /**
   * Save this cookie in the browser for a given domain
   * @param {string} domain - the domain of the cookie
   * @return {UplCookie}
   */
  save(domain) {
    let data = { click_id: this.click_id };

    Cookies.set(IMPACT_RADIUS_COOKIE_NAME, data, { expires: DEFAULT_EXPIRE_IN_DAYS, domain });

    return this;
  }

  /**
   * Create a new cookie from a JSON
   * @param {Object} json - The json containing the information about the cookie
   * @return {Cookie}
   */
  static fromJSON(json) {
    let cookie = new ImpactRadiusCookie();

    for (let property in json) {
      if (json.hasOwnProperty(property)) {
        cookie[property] = json[property];
      }
    }

    return cookie;
  }
}

export default ImpactRadiusCookie;
