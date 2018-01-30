import React from 'react';
import { Divider, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function (props) {
  const { name, description } = props;
  return (
    <div>
      <h3>
        <Link to={{ pathname: `/detail/${name}` }}>{name}</Link> { //eslint-disable-line
        }
        <Button
          style={{
            border: 'none',
          }}
          size="small"
        >
          <Link
            to={{ pathname: `/registry/${name}` }}
          >
            <Icon type="edit" />
          </Link>
        </Button>
      </h3>
      <p>{description}</p>
      <Divider />
    </div>
  );
}
