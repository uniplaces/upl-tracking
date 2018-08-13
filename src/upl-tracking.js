import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';
import { putRecord } from './services/data-infrastructure';
import { isUniplacesReferrer } from './referrer';
import { getUrlParameters } from './url-parameters';
import ActionsType from './enums/actions-type';
import UserType from './enums/user-type';
import EnvironmentType from './enums/environment-type';
import DataDeliveryStreamType from './enums/data-delivery-stream-type';
import PerformanceNavigationType from './enums/performance-navigation-type';
import config from './config';

/**
 * Set the environment for the library
 * @param {string} environment - The environment
 */
function setEnvironment(environment) {
  config.setEnvironment(environment);
}

/**
 * Track a new touch or update the existing one
 * @param {Object} [location={ origin: null, destination: null, language: null, city: null }] - The location's object
 * @return {Promise}
 */
function trackTouch(location = { origin: null, destination: null, language: null, city: null }) {
  const url = window.location.href;
  const params = getUrlParameters(url, location);

  let uplCookie = getCookie();
  if (!uplCookie) {
    uplCookie = new UplCookie();
  }

  if (isUniplacesReferrer() || isPageReload()) {
    return Promise.resolve({ msg: 'User is coming from another Uniplaces or from a page reload' });
  }

  uplCookie = uplCookie
    .refreshTimestamp()
    .setParameters(params)
    .setLocation(location)
    .save(config.getCookieDomain());

  return putRecord(config, DataDeliveryStreamType.UPL_TOUCHES, uplCookie.toJSON());
}

/**
 * Track an action
 * @param {string} actionType - The action's type
 * @param {string} [extraInfo=null] - Additional information related with the action
 * @return {Promise}
 */
function trackAction(actionType, extraInfo = null) {
  const uplCookie = getCookie();

  if (!uplCookie) {
    return Promise.reject({ msg: 'UPL cookie is not set' });
  }

  const record = {
    touch_id: uplCookie.getTouchId(),
    action: actionType,
    extra_info: extraInfo,
    created_at: Date.now()
  };

  return putRecord(config, DataDeliveryStreamType.UPL_ACTIONS, record);
}

/**
 * Assign a user ID to a tracking ID
 * @param {string} userId - The user's identifier
 * @param {string} [userType=guest] - The user's type
 * @return {Promise}
 */
function assignUserToTrackingId(userId, userType = UserType.GUEST) {
  const uplCookie = getCookie();
  if (!uplCookie) {
    return Promise.reject({ msg: 'UPL cookie is not set' });
  }

  const record = {
    tracking_id: uplCookie.tracking_id,
    user_type: userType,
    user_id: userId,
    created_at: Date.now()
  };

  return putRecord(config, DataDeliveryStreamType.UPL_USERS, record);
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
  // Page reload check is disabled in development for testing purposes
  if (config.isDevelopment()) {
    return false;
  }

  return window.performance && window.performance.navigation.type === PerformanceNavigationType.RELOAD;
}

export {
  setEnvironment,
  trackTouch,
  trackAction,
  assignUserToTrackingId,
  ActionsType,
  getCookie,
  getUrlParameters,
  EnvironmentType,
  UserType
};
