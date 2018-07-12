'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _environmentType = require('./enums/environment-type');

var _environmentType2 = _interopRequireDefault(_environmentType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var COOKIE_DOMAIN = {
  DEVELOPMENT: '.staging-uniplaces.com',
  STAGING: '.staging-uniplaces.com',
  PRODUCTION: '.uniplaces.com'
};

var DATA_INFRASTRUCTURE_URL = {
  DEVELOPMENT: 'https://data-events.staging-uniplaces.com/streams',
  STAGING: 'https://data-events.staging-uniplaces.com/streams',
  PRODUCTION: 'https://data-events.uniplaces.com/streams'
};

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);

    this.environment = _environmentType2.default.STAGING;
  }

  _createClass(Config, [{
    key: 'setEnvironment',
    value: function setEnvironment(environment) {
      if (!this.isValidEnvironment(environment)) {
        throw new Error('The environment \'' + environment + '\' is not valid.');
      }

      this.environment = environment;
    }
  }, {
    key: 'isValidEnvironment',
    value: function isValidEnvironment(environment) {
      return environment === _environmentType2.default.DEVELOPMENT || environment === _environmentType2.default.STAGING || environment === _environmentType2.default.PRODUCTION;
    }
  }, {
    key: 'getCookieDomain',
    value: function getCookieDomain() {
      return COOKIE_DOMAIN[this.environment];
    }
  }, {
    key: 'getDataInfrastructureUrl',
    value: function getDataInfrastructureUrl() {
      return DATA_INFRASTRUCTURE_URL[this.environment];
    }
  }]);

  return Config;
}();

var config = new Config();

exports.default = config;