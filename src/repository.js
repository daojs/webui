import axios from 'axios';
import { SERVICE_URL } from './constants';

export function createComponent({ name, source, metadata }) {
  const url = `${SERVICE_URL}/${name}`;
  return axios
    .post(url, { source, metadata }, {
      headers: { 'Content-Type': 'application/json' },
    });
}

export function getComponents({ path }) {
  const url = `${SERVICE_URL}/${path}`;
  return axios
    .get(url);
}
