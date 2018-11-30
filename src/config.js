import EnvironmentType from './enums/environment-type';

let CookieDomain = {
  development: '.uniplaces.lh',
  staging: '.staging-uniplaces.com',
  production: '.uniplaces.com'
};

let DataInfrastructureUrl = {
  development: 'https://data-events.staging-uniplaces.com/streams',
  staging: 'https://data-events.staging-uniplaces.com/streams',
  production: 'https://data-events.uniplaces.com/streams'
};

let ImpactRadiusUrl = {
  development: 'https://impact-radius.staging-uniplaces.com',
  staging: 'https://impact-radius.staging-uniplaces.com',
  production: 'https://impact-radius.uniplaces.com'
};

/** Class that represents the configuration of the library. This is meant to be used as a singleton. */
class Config {
  /**
   * Create a config. The environment defaults to staging.
   */
  constructor() {
    this.environment = EnvironmentType.STAGING;
  }

  /**
   * Get the current environment
   * @return {string}
   */
  getEnvironment() {
    return this.environment;
  }

  /**
   * Set the current environment
   * @param {string} environment
   * @throws Will throw an error if the environment is not valid
   */
  setEnvironment(environment) {
    if (!this.isValidEnvironment(environment)) {
      throw new Error(`The environment '${environment}' is not valid.`);
    }

    this.environment = environment;
  }

  /**
   * Check is a given environment is a valid environment
   * @param {string} environment
   * @return {bool}
   */
  isValidEnvironment(environment) {
    return environment === EnvironmentType.TEST
      || environment === EnvironmentType.DEVELOPMENT
      || environment === EnvironmentType.STAGING
      || environment === EnvironmentType.PRODUCTION;
  }

  /**
   * Check if the current environment is development
   * @return {bool}
   */
  isDevelopment() {
    return this.environment === EnvironmentType.DEVELOPMENT;
  }

  /**
   * Get the cookie domain
   * @return {string}
   */
  getCookieDomain() {
    return CookieDomain[this.environment] || CookieDomain[EnvironmentType.STAGING];
  }

  /**
   * Get the data infrastructure URL
   * @return {string}
   */
  getDataInfrastructureUrl() {
    return DataInfrastructureUrl[this.environment] || DataInfrastructureUrl[EnvironmentType.STAGING];
  }

  /**
   * Get the impact radius micro-service URL
   * @return {string}
   */
  getImpactRadiusUrl() {
    return ImpactRadiusUrl[this.environment] || ImpactRadiusUrl[EnvironmentType.STAGING];
  }
}

let configInstance = new Config();

export default configInstance;
