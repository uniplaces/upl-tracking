'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.putRecord = putRecord;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BASE_URLS = {
  STAGING: 'https://data-events.staging-uniplaces.com/streams',
  PRODUCTION: 'https://data-events.uniplaces.com/streams'
};

var dataInfrastructureService = _axios2.default.create({
  baseURL: BASE_URLS.STAGING,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

function putRecord(streamName, record) {
  var endpoint = '/' + streamName + '/record';

  return dataInfrastructureService.put(endpoint, record);
}