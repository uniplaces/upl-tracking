'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putRecord = putRecord;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataInfrastructureService = _axios2.default.create({
  baseURL: _config2.default.getDataInfrastructureUrl(),
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

function putRecord(streamName, record) {
  var endpoint = '/' + streamName + '/record';

  return dataInfrastructureService.put(endpoint, record);
}