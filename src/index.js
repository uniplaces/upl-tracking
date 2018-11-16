import 'whatwg-fetch';
import {
  setEnvironment as setImpactRadiusEnvironment,
  trackClickId,
  assignClickIdToBookingId
} from './impact-radius';
import {
  setEnvironment as setUplEnvironment,
  trackTouch,
  trackAction,
  assignUserToTrackingId,
  ActionsType,
  getCookie,
  getUrlParameters,
  EnvironmentType,
  UserType
} from './upl';

/**
 * Set the environment for the library
 * @param {string} environment - The environment
 */
function setEnvironments(environment) {
  setUplEnvironment(environment);
  setImpactRadiusEnvironment(environment);
}

export {
  setEnvironments as setEnvironment,
  trackTouch,
  trackAction,
  assignUserToTrackingId,
  ActionsType,
  getCookie,
  getUrlParameters,
  EnvironmentType,
  UserType,
  trackClickId,
  assignClickIdToBookingId
};
