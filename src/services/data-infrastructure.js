import axios from 'axios';

const dataInfrastructureService = axios.create({
  baseURL: 'https://data-events.staging-uniplaces.com/streams',
  timeout: 1500,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

export function putRecord(streamName, record) {
  const endpoint = `/${streamName}/record`;

  return dataInfrastructureService.put(endpoint, { data: record });
}
