/** @module DataInfrastructureService */
import axios from 'axios';
import config from '../config';

const dataInfrastructureService = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

/**
 * Put a record on data infrastructure
 * @param {Object} config - The config used on tracking
 * @param {string} streamName - The name of the data stream
 * @param {Object} record - The record to be sent to the stream
 * @return {Promise}
 */
export function putRecord(streamName, record) {
  const endpoint = `${config.getDataInfrastructureUrl()}/${streamName}/record`;

  return dataInfrastructureService.put(endpoint, { data: record });
}
