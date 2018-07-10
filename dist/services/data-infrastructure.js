'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.putRecord = putRecord;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataInfrastructureService = _axios2.default.create({
  baseURL: 'https://data-events.staging-uniplaces.com/streams',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

function putRecord(streamName, record) {
  var endpoint = '/' + streamName + '/record';
  var data = _extends({}, record, {
    timestamp: (0, _moment2.default)().format('x')
  });

  return dataInfrastructureService.put(endpoint, data);
}