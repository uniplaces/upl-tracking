(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./referrer"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./referrer"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.referrer);
    global.urlParameters = mod.exports;
  }
})(this, function (_exports, _referrer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.getUrlParameters = getUrlParameters;
  _exports.getInferedSource = getInferedSource;
  _exports.getInferedMedium = getInferedMedium;
  _exports.UrlParameters = void 0;
  var UrlParameters = [{
    name: 'source',
    inferedValue: getInferedSource,
    defaultValue: 'direct'
  }, {
    name: 'medium',
    inferedValue: getInferedMedium,
    defaultValue: 'destination_origin_language'
  }, {
    name: 'campaign',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: 'city_type'
  }, {
    name: 'term',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'content',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'gclid',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'msclkid',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'network',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'keyword',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'matchtype',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'device',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'devicemodel',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'adposition',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'adgroup',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'location',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'creative',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }, {
    name: 'sitelink',
    inferedValue: function inferedValue() {
      return null;
    },
    defaultValue: null
  }];
  _exports.UrlParameters = UrlParameters;

  function getUrlParameters(url) {
    var location = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var parsedUrl = new URL(url);
    var params = {};
    UrlParameters.forEach(function (urlParameter) {
      params[urlParameter.name] = parsedUrl.searchParams.get("upl_".concat(urlParameter.name)) || parsedUrl.searchParams.get("utm_".concat(urlParameter.name)) || urlParameter.inferedValue(url, location) || urlParameter.defaultValue;
    });
    return params;
  }

  function getInferedSource() {
    if (!(0, _referrer.hasReferrer)() || (0, _referrer.isUniplacesReferrer)()) {
      return null;
    }

    return (0, _referrer.getReferrer)().host.split('.')[1];
  }

  function getInferedMedium() {
    if (!(0, _referrer.hasReferrer)() || (0, _referrer.isUniplacesReferrer)()) {
      return null;
    }

    return 'organic';
  }
});