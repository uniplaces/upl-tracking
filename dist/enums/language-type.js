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
    global.languageType = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    DE_DE: 'german',
    EN_GB: 'english',
    FR_FR: 'french',
    IT_IT: 'italian',
    NL_NL: 'dutch',
    PL_PL: 'polish',
    PT_PT: 'portuguese',
    ZH_CN: 'mandarin'
  };
  _exports.default = _default;
});