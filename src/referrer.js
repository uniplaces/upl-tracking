/**
 * Check if the document.referrer is empty
 * @return {boolean}
 */
export function isEmptyReferrer() {
  return document.referrer === '';
}

/**
 * Get the document's referrer as URL
 * @return {(URL|null)} The URL object with the referrer or null if there is no referrer
 */
export function getReferrer() {
  return !isEmptyReferrer() ? new URL(document.referrer) : null;
}

/**
 * Check if the referrer exists and contains a substring
 * @param {string} substring
 * @return {boolean}
 */
export function isCustomReferrer(substring) {
  if (isEmptyReferrer()) {
    return false;
  }

  const referrer = new URL(document.referrer);

  return referrer.hostname.includes(substring);
}

/**
 * Check if the referrer is Uniplaces
 * @return {boolean}
 */
export function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}
