import { isUniplacesReferrer, hasReferrer, getReferrer } from './referrer';

export const UrlParameters = [
  { name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' },
  { name: 'medium', inferedValue: getInferedMedium, defaultValue: 'destination_origin_language' },
  { name: 'campaign', inferedValue: () => null, defaultValue: 'city_type' },
  { name: 'term', inferedValue: () => null, defaultValue: null },
  { name: 'content', inferedValue: () => null, defaultValue: null },
  { name: 'gclid', inferedValue: () => null, defaultValue: null },
  { name: 'msclkid', inferedValue: () => null, defaultValue: null },
  { name: 'network', inferedValue: () => null, defaultValue: null },
  { name: 'keyword', inferedValue: () => null, defaultValue: null },
  { name: 'matchtype', inferedValue: () => null, defaultValue: null },
  { name: 'device', inferedValue: () => null, defaultValue: null },
  { name: 'devicemodel', inferedValue: () => null, defaultValue: null },
  { name: 'adposition', inferedValue: () => null, defaultValue: null },
  { name: 'adgroup', inferedValue: () => null, defaultValue: null },
  { name: 'location', inferedValue: () => null, defaultValue: null },
  { name: 'creative', inferedValue: () => null, defaultValue: null },
  { name: 'sitelink', inferedValue: () => null, defaultValue: null }
];

/**
 * Get URL parameters
 * @param {string} url
 * @param {Object} location
 * @return {Object}
 */
export function getUrlParameters(url, location = {}) {
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

/**
 * Get the source, inferring it from the document.referrer
 * @return {string} the source infered from the referrer
 */
export function getInferedSource() {
  if (!hasReferrer() || isUniplacesReferrer()) {
    return null;
  }

  return getReferrer().host.split('.')[1];
}

/**
 * Get the medium, inferring it from the document.referrer
 * @return {string} the medium infered from the referrer
 */
export function getInferedMedium() {
  if (!hasReferrer() || isUniplacesReferrer()) {
    return null;
  }

  return 'organic';
}
