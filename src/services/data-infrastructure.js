/** @module DataInfrastructureService */
import axios from 'axios';

const BASE_URLS = {
  STAGING: 'https://data-events.staging-uniplaces.com/streams',
  PRODUCTION: 'https://data-events.uniplaces.com/streams'
};

const dataInfrastructureService = axios.create({
  baseURL: BASE_URLS.STAGING,
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
