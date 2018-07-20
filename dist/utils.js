(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./enums/language-type"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./enums/language-type"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.languageType);
    global.utils = mod.exports;
  }
})(this, function (_exports, _languageType) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.capitalize = capitalize;
  _exports.i18nToUplLocale = i18nToUplLocale;
  _languageType = _interopRequireDefault(_languageType);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function capitalize(string) {
    return "".concat(string[0].toUpperCase()).concat(string.slice(1).toLowerCase());
  }

  function i18nToUplLocale(i18nLocale) {
    return _languageType.default[i18nLocale.replace('-', '_').toUpperCase()];
  }
});