import React from 'react';
import { Card } from 'antd';

export default function (props) {
  const { name, description } = props;
  return (
    <Card title={name}>
      <p>{description}</p>
    </Card>);
}
