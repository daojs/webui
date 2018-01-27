import React from 'react';
import { Form, Divider } from 'antd';
import ComponentItem from './componentItemHoC';

export default function (props) {
  const { items = [], total = items.length, showResults } = props;
  let results = null;
  if (showResults) {
    results = (
      <h3>
        {total} component result(s)
        <Divider />
      </h3>
    );
  }
  return (
    <Form
      layout="vertical"
      style={{
        marginTop: '50px',
        width: '50%',
      }}
    >
      {results}
      {items.map(item => (<ComponentItem item={item} key={item} />))}
    </Form>
  );
}
