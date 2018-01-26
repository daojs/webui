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

export function getComponentChildren({ query }) { // TODO: will support real query
  const url = `${SERVICE_URL}/resources/${query}`;
  return axios
    .get(url);
}

export function fetchSuggestion({ query }) {
  const url = `${SERVICE_URL}/resources/${query}`;
  return axios
    .get(url);
}

export function getComponentMetadata({ name, version = 'latest' }) {
  const url = `${SERVICE_URL}/resources/${name}@${version}`;
  return axios
    .get(url)
    .then(response => _.defaults({
      data: _.defaults(response.data, {
        version,
      }),
    }, response));
}

export function getComponentSource({ name, version = 'latest' }) {
  const url = `${SERVICE_URL}/resources/${name}@${version}/source.json`;
  return axios
    .get(url);
}

export function getComponentSourceDebug({ name, version = 'latest' }) {
  const url = `${SERVICE_URL}/resources/${name}@${version}/source.debug.json`;
  return axios
    .get(url);
}

export function getComponentReadme({ name, version = 'latest' }) {
  const url = `${SERVICE_URL}/resources/${name}@${version}/README.md`;
  return axios
    .get(url);
}
