import React from 'react';
import { Divider } from 'antd';
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

export default function (props) {
  const { name, description, version = 0 } = props;
  return (
    <div>
      <h3>
        <Link to={{ pathname: `/detail/${name}@${version}` }}>{name}</Link> { //eslint-disable-line
        }
      </h3>
      <p>{description}</p>
      <Divider />
    </div>
  );
}
