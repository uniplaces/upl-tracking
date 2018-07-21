define(['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.hasReferrer = hasReferrer;
  exports.getReferrer = getReferrer;
  exports.isUniplacesReferrer = isUniplacesReferrer;
  exports.isCustomReferrer = isCustomReferrer;
  function hasReferrer() {
    return document.referrer && document.referrer !== '';
  }

  function getReferrer() {
    return hasReferrer() ? new URL(document.referrer) : null;
  }

  function isUniplacesReferrer() {
    return isCustomReferrer('uniplaces');
  }

  function isCustomReferrer(substring) {
    return hasReferrer() && document.referrer.includes(substring);
  }
});