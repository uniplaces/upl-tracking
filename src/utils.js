/** @module Utils */
import LanguageType from './enums/language-type';

/**
 * Capitalize a string
 * @param {string} string - The string to be capitalized
 * @return {string} The capitalized string
 */
export function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}

/**
 * Convert a i18n locale in an UPL locale
 * @param {string} i18nLocale - The locale in i18n format
 * @return {string} The locale in UPL format
 */
export function i18nToUplLocale(i18nLocale) {
  return i18nLocale ? LanguageType[i18nLocale.replace('-', '_').toUpperCase()] : null;
}
