'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasReferrer = hasReferrer;
exports.getReferrer = getReferrer;
exports.isCustomReferrer = isCustomReferrer;
exports.isUniplacesReferrer = isUniplacesReferrer;
function hasReferrer() {
  return document.referrer;
}

function getReferrer() {
  return hasReferrer() ? new URL(document.referrer) : null;
}

function isCustomReferrer(substring) {
  return hasReferrer() && document.referrer.includes(substring);
}

function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}