import config from './config';
import EnvironmentType from './enums/environment-type';

afterEach(() => {
  config.setEnvironment(EnvironmentType.STAGING);
});

test('it returns an instance', () => {
  expect(config).toBeTruthy();
  expect(config.environment).toBe(EnvironmentType.STAGING);
});

test('it sets a new environment', () => {
  const env = EnvironmentType.PRODUCTION;
  config.setEnvironment(env);

  expect(config.environment).toBe(env);
});

test('it throws an error on setting an invalid environment', () => {
  const invalidEnv = 'cenas';

  expect(() => config.setEnvironment(invalidEnv)).toThrowError('The environment \'cenas\' is not valid.');
});

test('it returns the correct cookie domain', () => {
  const result = config.getCookieDomain();

  expect(result).toBe('.staging-uniplaces.com');
});

test('it returns the correct data infrastructure url', () => {
  const result = config.getDataInfrastructureUrl();

  expect(result).toBe('https://data-events.staging-uniplaces.com/streams');
});

test('it returns values to staging when environment is test', () => {
  config.setEnvironment(EnvironmentType.TEST);
  const result = config.getDataInfrastructureUrl();

  expect(result).toBe('https://data-events.staging-uniplaces.com/streams');
});
