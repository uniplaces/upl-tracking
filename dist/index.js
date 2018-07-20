(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./upl-tracking"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./upl-tracking"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.uplTracking);
    global.index = mod.exports;
  }
})(this, function (_exports, _uplTracking) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "setEnvironment", {
    enumerable: true,
    get: function get() {
      return _uplTracking.setEnvironment;
    }
  });
  Object.defineProperty(_exports, "trackTouch", {
    enumerable: true,
    get: function get() {
      return _uplTracking.trackTouch;
    }
  });
  Object.defineProperty(_exports, "trackAction", {
    enumerable: true,
    get: function get() {
      return _uplTracking.trackAction;
    }
  });
  Object.defineProperty(_exports, "assignUserToTrackingId", {
    enumerable: true,
    get: function get() {
      return _uplTracking.assignUserToTrackingId;
    }
  });
  Object.defineProperty(_exports, "getCookie", {
    enumerable: true,
    get: function get() {
      return _uplTracking.getCookie;
    }
  });
  Object.defineProperty(_exports, "ActionsType", {
    enumerable: true,
    get: function get() {
      return _uplTracking.ActionsType;
    }
  });
});