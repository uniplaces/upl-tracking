import moment from 'moment';
import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';
import { putRecord } from './services/data-infrastructure';
import { isUniplacesReferrer } from './referrer';
import { getUrlParameters } from './url-parameters';
import ActionsType from './enums/actions-type';
import UserType from './enums/user-type';
import DateFormatType from './enums/date-format-type';
import EnvironmentType from './enums/environment-type';
import DataDeliveryStreamType from './enums/data-delivery-stream-type';
import PerformanceNavigationType from './enums/performance-navigation-type';
import config from './config';

/**
 * Set the environment for the library
 * @param {string} [environment=staging] - The environment
 */
function setEnvironment(environment = EnvironmentType.STAGING) {
  config.setEnvironment(environment);
}

/**
 * Track a new touch or update the existing one
 * @param {string} cookieDomain - The cookie domain to be used
 * @param {Object} location - The location's object
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
    return Promise.resolve();
  }

  uplCookie = uplCookie
    .setParameters(params)
    .setLocation(location)
    .save(cookieDomain);

  return putRecord(DataDeliveryStreamType.UPL_TOUCHES, uplCookie.toJSON());
}

/**
 * Track an action
 * @param {string} actionType - The action's type
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
 * Assign a user ID to a tracking ID
 * @param {string} userId - The user's identifier
 * @param {string} [userType=guest] - The user's type
 * @return {Promise}
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
  setEnvironment,
  trackTouch,
  trackAction,
  assignUserToTrackingId,
  ActionsType,
  getCookie,
  getUrlParameters
};
