import React from 'react';
import _ from 'lodash';
import ReactMarkdown from 'react-markdown';
import { Row, Divider } from 'antd';
import { SERVICE_URL } from './constants';

export default function (props) {
  const { readme, demo = {} } = props;
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

  let demoContent = null;
  if (demo.name) {
    const source = `${SERVICE_URL}/view/${demo.name}`;
    demoContent = (
      <div>
        <Divider>
          <h2>Preview: Demo</h2>
        </Divider>
        <iframe
          title="preivew"
          src={source}
          style={{
            border: 'none',
            width: '100%',
            height: '-webkit-fill-available',
          }}
        />
      </div>
    );
  }

  return (
    <Row>
      {markdown}
      {demoContent}
    </Row>
  );
}
