(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./enums/environment-type"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./enums/environment-type"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.environmentType);
    global.config = mod.exports;
  }
})(this, function (_exports, _environmentType) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _environmentType = _interopRequireDefault(_environmentType);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var CookieDomain = {
    development: '.staging-uniplaces.com',
    staging: '.staging-uniplaces.com',
    production: '.uniplaces.com'
  };
  var DataInfrastructureUrl = {
    development: 'https://data-events.staging-uniplaces.com/streams',
    staging: 'https://data-events.staging-uniplaces.com/streams',
    production: 'https://data-events.uniplaces.com/streams'
  };

  var Config = function () {
    function Config() {
      _classCallCheck(this, Config);

      this.environment = _environmentType.default.STAGING;
    }

    _createClass(Config, [{
      key: "setEnvironment",
      value: function setEnvironment(environment) {
        if (!this.isValidEnvironment(environment)) {
          throw new Error("The environment '".concat(environment, "' is not valid."));
        }

        this.environment = environment;
      }
    }, {
      key: "isValidEnvironment",
      value: function isValidEnvironment(environment) {
        return environment === _environmentType.default.TEST || environment === _environmentType.default.DEVELOPMENT || environment === _environmentType.default.STAGING || environment === _environmentType.default.PRODUCTION;
      }
    }, {
      key: "getCookieDomain",
      value: function getCookieDomain() {
        return CookieDomain[this.environment] || CookieDomain[_environmentType.default.STAGING];
      }
    }, {
      key: "getDataInfrastructureUrl",
      value: function getDataInfrastructureUrl() {
        return DataInfrastructureUrl[this.environment] || DataInfrastructureUrl[_environmentType.default.STAGING];
      }
    }]);

    return Config;
  }();

  var config = new Config();
  var _default = config;
  _exports.default = _default;
});