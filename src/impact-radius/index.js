import Cookies from 'js-cookie';
import config from '../config';
import ImpactRadiusCookie from './cookie';
import { getUrlParameter } from '../url-parameters';
import { create } from '../services/impact-radius';

const IMPACT_RADIUS_CLICK_ID_PARAM = 'ir_click_id';

/**
 * Set the environment for the library
 * @param {string} environment - The environment
 */
export function setEnvironment(environment) {
  config.setEnvironment(environment);
}

/**
 * Save the click ID in a cookie to be later associated
 * with a (potential) booking ID
 * @return {ImpactRadiusCookie}
 */
export function trackClickId() {
  const url = window.location.href;
  const clickId = getUrlParameter(url, IMPACT_RADIUS_CLICK_ID_PARAM);

  let impactRadiusCookie = getCookie();
  if (!impactRadiusCookie) {
    impactRadiusCookie = new ImpactRadiusCookie(clickId);
  }

  return impactRadiusCookie.save(config.getCookieDomain());
}

/**
 * Assign the click ID in the cookie with the
 * booking ID
 * @param {number} bookingId - the booking ID
 * @return {Promise}
 */
export function assignClickIdToBookingId(bookingId) {
  const impactRadiusCookie = getCookie();
  if (!impactRadiusCookie) {
    return Promise.reject({ msg: 'impact radius cookie is not set' });
  }

  return create(config, impactRadiusCookie.getClickId(), bookingId);
}

/**
 * Get the current Impact Radius cookie
 * @return {(ImpactRadiusCookie|null)}
 */
function getCookie() {
  const cookieName = ImpactRadiusCookie.getCookieName();
  const cookie = Cookies.getJSON(cookieName);

  return cookie ? ImpactRadiusCookie.fromJSON(cookie) : null;
}
