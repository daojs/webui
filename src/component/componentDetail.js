import _ from 'lodash';
import React from 'react';
import { Row, Col, Card, Form } from 'antd';
import ReactMarkdown from 'react-markdown';
import { SERVICE_URL } from '../constants';
import SourceCode from './source-code';
import DependencyList from './dependency-list';

const styles = {
  row: {
    background: '#fff',
    marginTop: '15px',
  },
};

export default function (props) {
  const {
    name,
    description,
    dependencies,
    version,
    readme = '',
    demo,
  } = props;


  return (
    <div>
      <Row style={styles.row} >
        <Col span={24}>
          <iframe
            title="demo"
            src={`${SERVICE_URL}/view/@/${name}/demo`}
            style={{ width: '100%', height: '500px', border: '0' }}
          />
        </Col>
      </Row>
      <Row style={_.defaults({ marginBottom: '15px' }, styles.row)}>
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
            <SourceCode source={demo.source || ''} />
          </Form>
        </Col>
        <Col span={5} offset={1}>
          <h3>Version</h3>
          <p>{version}</p>
          <DependencyList dependencies={dependencies} />
        </Col>
      </Row>
    </div>
  );
}
