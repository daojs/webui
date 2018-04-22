import React from 'react';
import { Table } from 'antd';
import _ from 'lodash';

export default function DependencyList(props) {
  const deps = props.dependencies || [];

  const dataSource = _.reduce(deps, (result, value, key) => result.concat({
    key,
    name: key,
    version: value.version || 'latest',
  }), []);

  const columns = [{
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'version',
    dataIndex: 'version',
    key: 'version',
  }];

  return (
    <React.Fragment>
      <h3>Dependencies</h3>
      <Table dataSource={dataSource} columns={columns} />
    </React.Fragment>
  );
}
