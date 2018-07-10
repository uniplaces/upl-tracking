import axios from 'axios';
import moment from 'moment';

const dataInfrastructureService = axios.create({
  baseURL: 'https://data-events.staging-uniplaces.com/streams',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export function putRecord(streamName, record) {
  const endpoint = `/${streamName}/record`;
  const data = {
    ...record,
    timestamp: moment().format('x')
  };

  return dataInfrastructureService.put(endpoint, data);
}
