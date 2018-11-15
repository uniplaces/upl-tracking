/** @module DataInfrastructureService */
/**
 * Put a record on data infrastructure
 * @param {Object} config - The config used on tracking
 * @param {string} streamName - The name of the data stream
 * @param {Object} record - The record to be sent to the stream
 * @return {Promise}
 */
export function putRecord(config, streamName, record) {
  const endpoint = `${config.getDataInfrastructureUrl()}/${streamName}/record`;
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };

  return fetch(endpoint, {
    method: 'PUT',
    headers,
    body: JSON.stringify(record)
  });
}
