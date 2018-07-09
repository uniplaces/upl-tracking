import LanguageType from './enums/language-type';

/**
 * Capitalize a string
 * @param {string} string
 * @return {string} the string capitalized
 */
export function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}

/**
 * Convert a i18n locale in an UPL locale
 * @param {string} i18nLocale - the locale in i18n format
 * @return {string} the locale in UPL format
 */
export function i18nToUplLocale(i18nLocale) {
  return LanguageType[i18nLocale.replace('-', '_').toUpperCase()];
}
