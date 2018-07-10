import Cookies from 'js-cookie';
import UplCookie from './upl-cookie';
import ActionsType from './enums/actions-type';
import UserType from './enums/user-type';
import DataDeliveryStreamType from './enums/data-delivery-stream-type';
import { putRecord } from './services/data-infrastructure';
import { isUniplacesReferrer, getReferrer } from './referrer';
import { UrlParameters } from './url-parameters';
/**
 * Track a new touch or update the existing one
 * @param {string} cookieDomain - the cookie domain to be used
 * @param {Object} location - the location's object
 * @returns {(UplCookie|null)} the saved UPL cookie or null
 */
function trackTouch(cookieDomain, location) {
  const url = window.location.href;
  const params = getUrlParameters(url, location);

  let uplCookie = getCookie();
  if (!uplCookie) {
    uplCookie = new UplCookie();
  }

  if (isUniplacesReferrer()) {
    return null;
  }

  uplCookie = uplCookie
    .setParameters(params)
    .setLocation(location)
    .save(cookieDomain);

  return putRecord(DataDeliveryStreamType.UPL_TOUCHES, uplCookie.toJSON());
}

/**
 *
 */
function trackAction(actionType) {
  const uplCookie = getCookie();
  const record = { touchId: uplCookie.getTouchId(), action: actionType };

  return !uplCookie
    ? Promise.reject()
    : putRecord(DataDeliveryStreamType.UPL_ACTIONS, record);
}

/**
 *
 */
function assignUserToTrackingId(userId, userType = UserType.GUEST) {
  const uplCookie = getCookie();
  const record = { trackingId: uplCookie.trackingId, userType, userId };

  return !uplCookie
    ? Promise.reject()
    : putRecord(DataDeliveryStreamType.UPL_USERS, record);
}

/**
 * Get the current touch (a.k.a. Upl cookie)
 * @returns {(UplCookie|null)}
 */
function getCookie() {
  const cookieName = UplCookie.getCookieName();
  const cookie = Cookies.getJSON(cookieName);

  return cookie ? UplCookie.fromJSON(cookie) : null;
}

/**
 * Get URL parameters
 * @param {string} url
 * @param {Object} location
 * @return {Object}
 */
function getUrlParameters(url, location = {}) {
  const parsedUrl = new URL(url);
  const params = {};

  UrlParameters.forEach((urlParameter) => {
    let param = parsedUrl.searchParams.get(`upl_${urlParameter.name}`);

    // If the upl_param does not exist, check for the corresponding utm_param
    if (param === null) {
      param = parsedUrl.searchParams.get(`utm_${urlParameter.name}`);
    }

    // Use Google Analytics to try to find something
    if (param === null) {
      param = urlParameter.inferedValue(url, location);
    }

    // Set the touch as direct -- use default values
    if (param === null) {
      param = urlParameter.defaultValue;
    }

    params[urlParameter.name] = param;
  });

  return params;
}

export {
  trackTouch,
  trackAction,
  assignUserToTrackingId,
  ActionsType,
  getCookie,
  getUrlParameters,
  getReferrer,
  isUniplacesReferrer
};
