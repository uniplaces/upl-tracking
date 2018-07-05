import LanguageType from './enums/language-type';

export function capitalize(string) {
  return `${string[0].toUpperCase()}${string.slice(1).toLowerCase()}`;
}

export function i18nToUplLocale(i18nLocale) {
  return LanguageType[i18nLocale.replace('-', '_').toUpperCase()];
}
