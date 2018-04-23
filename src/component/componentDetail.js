import _ from 'lodash';
import React, { Component } from 'react';
import { Row, Col, Card, Form, Icon, Tooltip } from 'antd';
import ReactMarkdown from 'react-markdown';
import { SERVICE_URL } from '../constants';
import SourceCode from './source-code';

const styles = {
  row: {
    background: '#fff',
    marginTop: '15px',
  },
};

export default class ComponentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCode: false,
    };
  }

  render() {
    const {
      name,
      description,
      // dependencies,
      // version,
      readme = '',
      demo,
    } = this.props;


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
          <Col span={22} offset={1}>
            <Form>
              <h2 style={{ marginTop: '20px' }}>{name}</h2>
              <Form.Item>
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  borderLeft: '4px solid #ccc',
                  padding: '0 15px',
                }}
                >
                  <div style={{ flex: 1 }} >
                    Description: {description}
                  </div>
                  <Tooltip title="Show Code">
                    <Icon
                      type="code-o"
                      style={{ fontSize: '18px', cursor: 'pointer' }}
                      onClick={() => this.setState({ showCode: !this.state.showCode })}
                    />
                  </Tooltip>
                </div>
                { this.state.showCode &&
                  <SourceCode source={demo.source || ''} /> }
              </Form.Item>
              <Form.Item>
                <Card
                  type="inner"
                  title="README.md"
                  className="readme"
                >
                  <ReactMarkdown source={readme} />
                </Card>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}
