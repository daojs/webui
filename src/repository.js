import axios from 'axios';
import _ from 'lodash';
import { SERVICE_URL } from './constants';

export function createComponent(options) {
  const { name } = options;
  const url = `${SERVICE_URL}/resources/${name}`;
  return axios
    .post(url, _.omit(options, 'name'), {
      headers: { 'Content-Type': 'application/json' },
    });
}

export function getComponents({ query }) { // TODO: will support real query
  const url = `${SERVICE_URL}/resources/${query}`;
  return axios
    .get(url);
}

export function fetchSuggestion({ query }) {
  const url = `${SERVICE_URL}/resources/${query}`;
  return axios
    .get(url);
}
