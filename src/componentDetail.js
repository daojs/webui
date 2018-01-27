import _ from 'lodash';
import React from 'react';
import { Row, Col, Table, Card, Form } from 'antd';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/styles/hljs';
import ReactMarkdown from 'react-markdown';


export default function (props) {
  const {
    name,
    description,
    version,
    dependencies,
    source,
    readme = '',
  } = props;

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
          <Form>
            <Form.Item>
              <h1>{name}</h1>
            </Form.Item>
            <Form.Item>
              <div style={{
                padding: '0 15px',
                borderLeft: '4px solid #ccc',
              }}
              >
                Description: {description}
              </div>
            </Form.Item>
            <Form.Item>
              <Card
                type="inner"
                title="README.md"
              >
                <ReactMarkdown source={readme} />
              </Card>
            </Form.Item>
            <Form.Item>
              <Card
                type="inner"
                title="Source code"
              >
                <SyntaxHighlighter language="javascript" style={vs}>{source.data}</SyntaxHighlighter>
              </Card>
            </Form.Item>
          </Form>
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
