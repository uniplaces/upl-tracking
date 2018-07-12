import EnvironmentType from './enums/environment-type';

const COOKIE_DOMAIN = {
  DEVELOPMENT: '.staging-uniplaces.com',
  STAGING: '.staging-uniplaces.com',
  PRODUCTION: '.uniplaces.com'
};

const DATA_INFRASTRUCTURE_URL = {
  DEVELOPMENT: 'https://data-events.staging-uniplaces.com/streams',
  STAGING: 'https://data-events.staging-uniplaces.com/streams',
  PRODUCTION: 'https://data-events.uniplaces.com/streams'
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
   * Set the current environment
   * @param {string} environment
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
    return environment === EnvironmentType.DEVELOPMENT
      || environment === EnvironmentType.STAGING
      || environment === EnvironmentType.PRODUCTION;
  }

  /**
   * Get the cookie domain
   * @return {string}
   */
  getCookieDomain() {
    return COOKIE_DOMAIN[this.environment];
  }

  /**
   * Get the data infrastructure URL
   * @return {string}
   */
  getDataInfrastructureUrl() {
    return DATA_INFRASTRUCTURE_URL[this.environment];
  }
}

const config = new Config();

export default config;
