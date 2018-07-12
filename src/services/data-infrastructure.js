/** @module DataInfrastructureService */
import axios from 'axios';
import config from '../config';

const dataInfrastructureService = axios.create({
  baseURL: config.getDataInfrastructureUrl(),
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

/**
 * Put a record on data infrastructure
 * @param {string} streamName - The name of the data stream
 * @param {Object} record - The record to be sent to the stream
 * @return {Promise}
 */
export function putRecord(streamName, record) {
  const endpoint = `/${streamName}/record`;

  return dataInfrastructureService.put(endpoint, record);
}
