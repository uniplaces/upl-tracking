'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmptyReferrer = isEmptyReferrer;
exports.getReferrer = getReferrer;
exports.isCustomReferrer = isCustomReferrer;
exports.isUniplacesReferrer = isUniplacesReferrer;
function isEmptyReferrer() {
  return document.referrer === '';
}

function getReferrer() {
  return !isEmptyReferrer() ? new URL(document.referrer) : null;
}

function isCustomReferrer(substring) {
<<<<<<< f15cbbe166802cde627ea4b32e255507765a7aca
  var referrer = getReferrer();

  return referrer !== null && referrer.hostname.includes(substring);
=======
  return !isEmptyReferrer() && document.referrer.includes(substring);
>>>>>>> Commit previous dist
}

function isUniplacesReferrer() {
  return isCustomReferrer('uniplaces');
}