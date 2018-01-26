import React from 'react';
import { Row, Col, Table } from 'antd';
import _ from 'lodash';
import showdown from 'showdown';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/styles/hljs';

const converter = new showdown.Converter();
converter.setFlavor('github');

export default function (props) {
  const {
    name,
    description,
    version,
    dependencies,
    source,
    readme = '',
  } = props;

  const readmeMarkup = { __html: converter.makeHtml(readme) };

  const dataSource = _.reduce(dependencies, (result, value, key) => result.concat({
    key,
    name: key,
    version: value.version,
  }), []);

  const columns = [{
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: 'version',
    dataIndex: 'version',
    key: 'version',
  }];

  return (
    <div>
      <Row>
        <Col span={14} offset={2}>
          <h1>{name}</h1>
          <div style={{
            padding: '10px 15px',
            borderLeft: '4px solid #ccc',
          }}
          >
            Description: {description}
          </div>
          <div
            style={{
              marginTop: '20px',
            }}
            dangerouslySetInnerHTML={readmeMarkup} // eslint-disable-line
          />
          <div
            style={{
              marginTop: '20px',
            }}
          >
            <SyntaxHighlighter language="javascript" style={vs}>{source.data}</SyntaxHighlighter>
          </div>
        </Col>
        <Col span={5} offset={1}>
          <h3>Version</h3>
          <p>{version}</p>
          <h3>Dependencies</h3>
          <Table dataSource={dataSource} columns={columns} />
        </Col>
      </Row>
    </div>
  );
}
