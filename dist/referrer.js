(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.referrer = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.hasReferrer = hasReferrer;
  _exports.getReferrer = getReferrer;
  _exports.isUniplacesReferrer = isUniplacesReferrer;
  _exports.isCustomReferrer = isCustomReferrer;

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