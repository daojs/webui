import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Row, Divider } from 'antd';

export default function (props) {
  const { readme, demoUrl } = props;
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
  if (demoUrl) {
    demoContent = (
      <div>
        <Divider>
          <h2>Preview: Demo</h2>
        </Divider>
        <iframe
          title="preivew"
          src={demoUrl}
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
