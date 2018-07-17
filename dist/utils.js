'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalize = capitalize;
exports.i18nToUplLocale = i18nToUplLocale;

var _languageType = require('./enums/language-type');

var _languageType2 = _interopRequireDefault(_languageType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalize(string) {
  return '' + string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function i18nToUplLocale(i18nLocale) {
  return _languageType2.default[i18nLocale.replace('-', '_').toUpperCase()];
}