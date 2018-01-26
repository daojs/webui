import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

/* eslint-disable */
function getDetailLink({ name, version = 0 }) {
  return (
    <a>
      <Link to={{pathname: `/detail/${name}@${version}`}}>Detail</Link>
    </a>
  );
}

function getEditLink({name, version = 0}) {
  return (
    <a>
      <Link to={{pathname: `/registry/${name}@${version}`}}>Edit</Link>
    </a>
  );
}

function getExtra(props) {
  return (
    <div>
      {getDetailLink(props)} {getEditLink(props)}
    </div>
  )
}
/* eslint-enable */

export default function (props) {
  const { name, description } = props;
  return (
    <Card title={name} extra={getExtra(props)}>
      <p>{description}</p>
    </Card>);
}
