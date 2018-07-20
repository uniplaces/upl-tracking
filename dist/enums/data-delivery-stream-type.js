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
    global.dataDeliveryStreamType = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    UPL_TOUCHES: 'upl-touches-v1',
    UPL_ACTIONS: 'upl-actions-v1',
    UPL_USERS: 'upl-users-v1'
  };
  _exports.default = _default;
});