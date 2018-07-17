/**
 * Check if it exists a document.referrer
 * @return {boolean} If there is a referrer
 */
export function hasReferrer() {
  return document.referrer && document.referrer !== '';
}

/**
 * Get the document's referrer as URL
 * @return {(URL|null)} The URL object with the referrer or null if there is no referrer
 */
export function getReferrer() {
  return hasReferrer() ? new URL(document.referrer) : null;
}

/**
 * Check if the referrer is Uniplaces
 * @return {boolean}
 */
export function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

/**
 * Check if the referrer exists and contains a substring
 * @param {string} substring
 * @return {boolean}
 */
export function isCustomReferrer(substring) {
  return hasReferrer() && document.referrer.includes(substring);
}
