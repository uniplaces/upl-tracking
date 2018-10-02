import { isUniplacesReferrer, isEmptyReferrer, getReferrer } from './referrer';
import URLSearchParams from 'url-search-params';

const PrefixedUrlParameters = [
  { name: 'source', inferedValue: getInferedSource, defaultValue: 'direct' },
  { name: 'medium', inferedValue: getInferedMedium, defaultValue: 'destination_origin_language' },
  { name: 'campaign', inferedValue: () => null, defaultValue: 'city_type' },
  { name: 'term', inferedValue: () => null, defaultValue: null },
  { name: 'content', inferedValue: () => null, defaultValue: null }
];

const UrlParameters = [
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
 * Get a specific URL parameter
 * @param {string} url - The URL to be parsed
 * @param {string} parameter - The parameter to get
 * @return {string|null}
 */
export function getUrlParameter(url, parameter) {
  const parsedUrl = new URL(url);
  const searchParams = parsedUrl.searchParams || new URLSearchParams(parsedUrl.search);

  return searchParams.get(parameter);
}

/**
 * Get URL parameters
 * @param {string} url - The URL to be parsed
 * @param {Object} [location={ origin: null, destination: null, language: null }] - The location
 * @return {Object}
 */
export function getUrlParameters(url, location = { origin: null, destination: null, language: null }) {
  const parsedUrl = new URL(url);
  const params = {};

  /*
   * If searchParams doesn't exist, replace with a polyfill
   * This is needed for MS Edge < 17
   */
  const searchParams = parsedUrl.searchParams || new URLSearchParams(parsedUrl.search);

  PrefixedUrlParameters.forEach((urlParameter) => {
    /*
     * If the upl_param does not exist, check for the corresponding utm_param
     * If the utm_param does not exist, use an infered value given the url and location
     * If the infered value is null, set the touch as direct -- use default values
     */
    params[urlParameter.name] = searchParams.get(`upl_${urlParameter.name}`)
      || searchParams.get(`utm_${urlParameter.name}`)
      || urlParameter.inferedValue(url, location)
      || urlParameter.defaultValue;
  });

  UrlParameters.forEach((urlParameter) => {
    params[urlParameter.name] = searchParams.get(urlParameter.name)
      || urlParameter.inferedValue(url, location)
      || urlParameter.defaultValue;
  });

  return params;
}

/**
 * Get the source, inferring it from the document.referrer
 * @return {string} the source infered from the referrer
 */
export function getInferedSource() {
  if (isEmptyReferrer() || isUniplacesReferrer()) {
    return null;
  }

  const source = getReferrer().host.split('.')[1];
  const affix = 'organic';

  return `${source}_${affix}`;
}

/**
 * Get the medium, inferring it from the document.referrer
 * @param {string} url - the url
 * @param {Object} location - the location
 * @return {string} the medium infered from the referrer
 */
export function getInferedMedium(_, location) {
  const { origin, destination, language } = location;
  const placeholder = 'xx';

  if (location.origin || location.destination || location.language) {
    return `${origin || placeholder}_${destination || placeholder}_${language || placeholder}`;
  }

  return 'organic';
}
