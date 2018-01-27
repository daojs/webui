import React from 'react';
import _ from 'lodash';
import ComponentSearch from './componentSearch';
import { fetchSuggestion as getSuggestion } from './repository';

function fetchSuggestion({ query, dataSource }, callback) {
  if (!_.endsWith(query, '/') && !_.isEmpty(query)) {
    return Promise.resolve(dataSource);
  }
  return getSuggestion({ query })
    .then(({ data }) => {
      const dateSource = _.map(data.children, item => `${query}${item}`);
      callback(dateSource);
    })
    .catch(() => {});
}

export default function (props) {
  const { onSearch, ...otherProps } = props;
  return (
    <ComponentSearch
      fetchSuggestion={fetchSuggestion}
      onSearchComponents={onSearch}
      {...otherProps}
    />
  );
}
