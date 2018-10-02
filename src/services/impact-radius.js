/** @module ImpactRadiusService */
import axios from 'axios';

const impactRadiusService = axios.create({
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

/**
 * Create a new booking-impact-radius
 * @param {Object} config - The config used on tracking
 * @param {string} streamName - The name of the data stream
 * @param {Object} record - The record to be sent to the stream
 * @return {Promise}
 */
export function create(config, clickId, bookingId) {
  const endpoint = `${config.getImpactRadiusUrl()}/impact-radius`;
  const data = {
    data: {
      click_id: clickId,
      booking_id: bookingId
    }
  };

  return impactRadiusService.post(endpoint, data);
}
