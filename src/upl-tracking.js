import moment from 'moment';
import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';
import { putRecord } from './services/data-infrastructure';
import { isUniplacesReferrer } from './referrer';
import { getUrlParameters } from './url-parameters';
import ActionsType from './enums/actions-type';
import UserType from './enums/user-type';
import DateFormatType from './enums/date-format-type';
import DataDeliveryStreamType from './enums/data-delivery-stream-type';
import PerformanceNavigationType from './enums/performance-navigation-type';

/**
 * Track a new touch or update the existing one
 * @param {string} cookieDomain - the cookie domain to be used
 * @param {Object} location - the location's object
 * @return {Promise}
 */
function trackTouch(cookieDomain, location) {
  const url = window.location.href;
  const params = getUrlParameters(url, location);

  let uplCookie = getCookie();
  if (!uplCookie) {
    uplCookie = new UplCookie();
  }

  if (isUniplacesReferrer() || isPageReload()) {
    return Promise.reject();
  }

  uplCookie = uplCookie
    .setParameters(params)
    .setLocation(location)
    .save(cookieDomain);

  return putRecord(DataDeliveryStreamType.UPL_TOUCHES, uplCookie.toJSON());
}

/**
 * Track an action
 * @param {string} actionType - the type of the action
 * @return {Promise}
 */
function trackAction(actionType) {
  const uplCookie = getCookie();
  const record = {
    touch_id: uplCookie.getTouchId(),
    action: actionType,
    created_at: moment().format(DateFormatType.UNIX)
  };

  return !uplCookie
    ? Promise.reject()
    : putRecord(DataDeliveryStreamType.UPL_ACTIONS, record);
}

/**
 *
 */
function assignUserToTrackingId(userId, userType = UserType.GUEST) {
  const uplCookie = getCookie();
  const record = {
    tracking_id: uplCookie.tracking_id,
    user_type: userType,
    user_id: userId,
    created_at: moment().format(DateFormatType.UNIX)
  };

  return !uplCookie
    ? Promise.reject()
    : putRecord(DataDeliveryStreamType.UPL_USERS, record);
}

/**
 * Get the current touch (a.k.a. Upl cookie)
 * @return {(UplCookie|null)}
 */
function getCookie() {
  const cookieName = UplCookie.getCookieName();
  const cookie = Cookies.getJSON(cookieName);

  return cookie ? UplCookie.fromJSON(cookie) : null;
}

/**
 * Check if the user accessed the page by reloading it
 * @return {bool}
 */
function isPageReload() {
  return window.performance && window.performance.navigation.type === PerformanceNavigationType.RELOAD;
}

export {
  trackTouch,
  trackAction,
  assignUserToTrackingId,
  ActionsType,
  getCookie,
  getUrlParameters
};
