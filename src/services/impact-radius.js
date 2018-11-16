/** @module ImpactRadiusService */
/**
 * Create a new booking-impact-radius
 * @param {Object} config - The config used on tracking
 * @param {string} streamName - The name of the data stream
 * @param {Object} record - The record to be sent to the stream
 * @return {Promise}
 */
export function create(config, clickId, bookingId) {
  const endpoint = `${config.getImpactRadiusUrl()}/impact-radius`;
  const headers = {
    'Content-Type': 'application/json; charset=utf-8'
  };
  const data = {
    click_id: clickId,
    booking_id: bookingId
  };

  return fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });
}
