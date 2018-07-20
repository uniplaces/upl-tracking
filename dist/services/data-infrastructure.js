(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "axios", "../config"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("axios"), require("../config"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.config);
    global.dataInfrastructure = mod.exports;
  }
})(this, function (_exports, _axios, _config) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.putRecord = putRecord;
  _axios = _interopRequireDefault(_axios);
  _config = _interopRequireDefault(_config);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var dataInfrastructureService = _axios.default.create({
    baseURL: _config.default.getDataInfrastructureUrl(),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });

  function putRecord(streamName, record) {
    var endpoint = "/".concat(streamName, "/record");
    return dataInfrastructureService.put(endpoint, {
      data: record
    });
  }
});