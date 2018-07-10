'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasReferrer = hasReferrer;
exports.getReferrer = getReferrer;
exports.isUniplacesReferrer = isUniplacesReferrer;
exports.isCustomReferrer = isCustomReferrer;
/**
 * Check if it exists a document.referrer
 * @return {boolean} If there is a referrer
 */
function hasReferrer() {
  return document.referrer && document.referrer !== '';
}

/**
 * Get the document's referrer as URL
 * @return {(URL|null)} The URL object with the referrer or null if there is no referrer
 */
function getReferrer() {
  return hasReferrer() ? new URL(document.referrer) : null;
}

/**
 * Check if the referrer is Uniplaces
 * @return {boolean}
 */
function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

/**
 * Check if the referrer exists and contains a substring
 * @param {string} substring
 * @return {boolean}
 */
function isCustomReferrer(substring) {
  return hasReferrer() && document.referrer.includes(substring);
}