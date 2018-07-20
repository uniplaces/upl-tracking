(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "uuid/v4", "moment", "js-cookie", "./utils"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("uuid/v4"), require("moment"), require("js-cookie"), require("./utils"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.v4, global.moment, global.jsCookie, global.utils);
    global.uplCookie = mod.exports;
  }
})(this, function (_exports, _v, _moment, _jsCookie, _utils) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  _v = _interopRequireDefault(_v);
  _moment = _interopRequireDefault(_moment);
  _jsCookie = _interopRequireDefault(_jsCookie);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var UPL_COOKIE_NAME = 'upl_cookie';
  var DEFAULT_EXPIRE_IN_DAYS = 180;

  var UplCookie = function () {
    function UplCookie(trackingId, createdAt) {
      _classCallCheck(this, UplCookie);

      this.tracking_id = trackingId || (0, _v.default)();
      this.created_at = createdAt || (0, _moment.default)().valueOf();
    }

    _createClass(UplCookie, [{
      key: "getTouchId",
      value: function getTouchId() {
        return "".concat(this.tracking_id, "_").concat(this.created_at);
      }
    }, {
      key: "getLocation",
      value: function getLocation() {
        return {
          origin: this.origin,
          destination: this.destination,
          language: this.language,
          city: this.city
        };
      }
    }, {
      key: "setParameters",
      value: function setParameters(parameters) {
        this.source = parameters.source;
        this.medium = parameters.medium;
        this.campaign = parameters.campaign;
        this.term = parameters.term;
        this.content = parameters.content;
        this.gclid = parameters.gclid;
        this.msclkid = parameters.msclkid;
        this.network = parameters.network;
        this.keyword = parameters.keyword;
        this.match_type = parameters.matchtype;
        this.device = parameters.device;
        this.device_model = parameters.devicemodel;
        this.ad_position = parameters.adposition;
        this.ad_group = parameters.adgroup;
        this.location = parameters.location;
        this.creative = parameters.creative;
        this.site_link = parameters.sitelink;
        return this;
      }
    }, {
      key: "setLocation",
      value: function setLocation() {
        var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
          origin: null,
          destination: null,
          language: null,
          city: null
        };
        this.origin = location.origin;
        this.destination = location.destination;
        this.language = (0, _utils.i18nToUplLocale)(location.language);
        this.city = location.city;
        return this;
      }
    }, {
      key: "save",
      value: function save(domain) {
        _jsCookie.default.set(UPL_COOKIE_NAME, this.toJSON(), {
          expires: DEFAULT_EXPIRE_IN_DAYS,
          domain: domain
        });

        return this;
      }
    }, {
      key: "toJSON",
      value: function toJSON() {
        var touchId = this.getTouchId();
        return _objectSpread({
          touch_id: touchId
        }, this);
      }
    }], [{
      key: "getCookieName",
      value: function getCookieName() {
        return UPL_COOKIE_NAME;
      }
    }, {
      key: "fromJSON",
      value: function fromJSON(json) {
        var cookie = new UplCookie();

        for (var property in json) {
          if (!json.hasOwnProperty(property)) {
            continue;
          }

          cookie[property] = json[property];
        }

        return cookie;
      }
    }]);

    return UplCookie;
  }();

  var _default = UplCookie;
  _exports.default = _default;
});