import React from 'react';
import { Form } from 'antd';
import ComponentItem from './componentItemHoC';

export default function (props) {
  const { items = [] } = props;
  return (
    <Form
      layout="vertical"
      style={{
        marginTop: '50px',
        width: '50%',
      }}
    >
      {items.map(item => (<Form.Item key={item}><ComponentItem item={item} /></Form.Item>))}
    </Form>
  );
}
