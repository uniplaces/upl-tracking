'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = require('uuid/v4');

var _v2 = _interopRequireDefault(_v);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _utils = require('./utils');

var _dateFormatType = require('./enums/date-format-type');

var _dateFormatType2 = _interopRequireDefault(_dateFormatType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UPL_COOKIE_NAME = 'upl_cookie';
var DEFAULT_EXPIRE_IN_DAYS = 180;

var UplCookie = function () {
  function UplCookie(trackingId, createdAt) {
    _classCallCheck(this, UplCookie);

    this.tracking_id = trackingId || (0, _v2.default)();
    this.created_at = createdAt || (0, _moment2.default)().format(_dateFormatType2.default.UNIX);
  }

  _createClass(UplCookie, [{
    key: 'getTouchId',
    value: function getTouchId() {
      return this.tracking_id + '_' + this.created_at;
    }
  }, {
    key: 'getLocation',
    value: function getLocation() {
      return {
        origin: this.origin,
        destination: this.destination,
        language: this.language,
        city: this.city
      };
    }
  }, {
    key: 'setParameters',
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
    key: 'setLocation',
    value: function setLocation() {
      var location = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { origin: null, destination: null, language: null, city: null };

      this.origin = location.origin;
      this.destination = location.destination;
      this.language = (0, _utils.i18nToUplLocale)(location.language);
      this.city = location.city;

      return this;
    }
  }, {
    key: 'save',
    value: function save(domain) {
      _jsCookie2.default.set(UPL_COOKIE_NAME, this.toJSON(), { expires: DEFAULT_EXPIRE_IN_DAYS, domain: domain });

      return this;
    }
  }, {
    key: 'toJSON',
    value: function toJSON() {
      var touchId = this.getTouchId();

      return _extends({ touch_id: touchId }, this);
    }
  }], [{
    key: 'getCookieName',
    value: function getCookieName() {
      return UPL_COOKIE_NAME;
    }
  }, {
    key: 'fromJSON',
    value: function fromJSON(json) {
      var cookie = new UplCookie();

      for (var property in json) {
        if (json.hasOwnProperty(property)) {
          cookie[property] = json[property];
        }
      }

      return cookie;
    }
  }]);

  return UplCookie;
}();

exports.default = UplCookie;