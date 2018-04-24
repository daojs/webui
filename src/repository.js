import axios from 'axios';
import _ from 'lodash';
import { SERVICE_URL, BLACK_LIST } from './constants';

export function postComponent(options) {
  const { name } = options;
  const url = `${SERVICE_URL}/components/${name}`;
  return axios
    .post(url, _.omit(options, 'name'), {
      headers: { 'Content-Type': 'application/json' },
    })
    .catch((e) => {
      console.error(e); // eslint-disable-line
    });
}

const getAllComponents = axios.get(`${SERVICE_URL}/list/@/`)
  .then(response => _.chain(response)
    .get('data.children', [])
    .reject(item => _.includes(BLACK_LIST, item))
    .value())
  .catch(() => []);

// TODO: will support real query, just list and concat children
export function search({
  query = '',
} = {}) {
  return getAllComponents.then(comps => _.filter(comps, comp => _.includes(comp, query)));
}

// TODO: just list direct children of query
export function listChildren({
  query,
} = {}) {
  const url = `${SERVICE_URL}/list/@/${query}`;
  return axios
    .get(url)
    .catch((e) => {
      console.error(e); // eslint-disable-line
      return { children: [] };
    });
}

export function getComponent({ name, version = 0 }) {
  let url = `${SERVICE_URL}/components/@/${name}`;
  if (version) {
    url = `${url}?v=${version}`;
  }
  return axios
    .get(url)
    .then(response => _.defaults({
      data: _.defaults(response.data, {
        version,
      }),
    }, response))
    .catch((e) => {
      console.error(e); // eslint-disable-line
      return { data: {} };
    });
}
