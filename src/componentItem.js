import React from 'react';
import { Divider, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

export default function (props) {
  const { name, description } = props;
  return (
    <div>
      <h3>
        <p to={{ pathname: `/detail/${name}` }}>{name}</p> { //eslint-disable-line
        }
        {/* <Button
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
        </Button> */}
      </h3>
    </div>
  );
}
