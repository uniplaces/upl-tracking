'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyReferrer = isEmptyReferrer;
exports.getReferrer = getReferrer;
exports.isCustomReferrer = isCustomReferrer;
exports.isUniplacesReferrer = isUniplacesReferrer;
exports.isPayPalReferrer = isPayPalReferrer;
function isEmptyReferrer() {
  return document.referrer === '';
}

function getReferrer() {
  return !isEmptyReferrer() ? new URL(document.referrer) : null;
}

function isCustomReferrer(substring) {
  var referrer = getReferrer();

  return referrer !== null && referrer.hostname.includes(substring);
}

function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}

function isPayPalReferrer() {
  return isCustomReferrer('paypal');
}