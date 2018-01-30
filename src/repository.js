import axios from 'axios';
import _ from 'lodash';
import { SERVICE_URL } from './constants';

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

export function search({ query }) { // TODO: will support real query, just list and concat children
  const url = `${SERVICE_URL}/list/${query}`;
  return axios
    .get(url)
    .then(({ data }) => {
      const { version, children = [] } = data;
      const list = _.compact(query.split('/'));
      let items = _.map(children, (item) => {
        const tmp = list.concat(item);
        return tmp.join('/');
      });
      if (version) {
        items = [query].concat(items);
      }
      return items;
    });
}

export function listChildren({ query }) { // TODO: just list direct children of query
  const url = `${SERVICE_URL}/list/${query}`;
  return axios
    .get(url)
    .catch((e) => {
      console.error(e); // eslint-disable-line
      return { children: [] };
    });
}

export function getComponent({ name, version = 0 }) {
  let url = `${SERVICE_URL}/components/${name}`;
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
