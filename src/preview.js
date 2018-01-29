import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Divider } from 'antd';
import { SERVICE_URL } from './constants';

export default function (props) {
  const { readme, demo, name } = props;
  let markdown = null;
  if (readme) {
    markdown = (
      <div>
        <Divider>
          <h2>Preview: README</h2>
        </Divider>
        <ReactMarkdown source={readme} />
      </div>
    );
  }
  const source = `${SERVICE_URL}/${name}/${demo}/resolve`;
  return (
    <Row>
      {markdown}
      <Divider>
        <h2>Preview: Demo</h2>
      </Divider>
      <iframe title="preivew" src={source} />
    </Row>
  );
}
