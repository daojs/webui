import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Table, Card, Form, Button } from 'antd';
import ReactMarkdown from 'react-markdown';
import { SERVICE_URL } from './constants';


export default function (props) {
  const {
    name,
    description,
    version,
    dependencies,
    readme = '',
  } = props;

  const dataSource = _.reduce(dependencies, (result, value, key) => result.concat({
    key,
    name: key,
    version: value.version || 'latest',
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
      <Row style={{ background: '#fff', marginTop: '15px' }} >
        <Col span={24}>
          <iframe
            title="demo"
            src={`${SERVICE_URL}/view/@/${name}/demo`}
            style={{ width: '100%', height: '500px', border: '0' }}
          />
        </Col>
      </Row>
      <Row style={{ background: '#fff', marginTop: '15px', marginBottom: '15px' }}>
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
          </Form>
        </Col>
        <Col span={5} offset={1}>
          <h3>Version</h3>
          <p>{version}</p>
          <h3>Dependencies</h3>
          <Table dataSource={dataSource} columns={columns} />
          <Form>
            <Form.Item>
              <a href={`/view/${name}`} >
                <Button icon="play-circle">See demo</Button>
              </a>
              <br />
              <Link to={`/registry/${name}`} >
                <Button icon="edit">Edit component</Button>
              </Link>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
