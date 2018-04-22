import React, { Component } from 'react';
import { Row, Col } from 'antd';
import _ from 'lodash';
import Registry from './registryHoC';
import Preview from './preview';
import { SERVICE_URL } from '../constants';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPreview = this.onPreview.bind(this);
  }

  onPreview({ readme, demo }) {
    this.setState({
      readme,
      demoUrl: `${SERVICE_URL}/view/${demo.name}?salt=${_.random()}`,
    });
  }

  render() {
    return (
      <Row>
        <Col span={12}>
          <Registry
            {...this.props}
            onPreview={this.onPreview}
          />
        </Col>
        <Col span={12}>
          <Preview {...this.state} />
        </Col>
      </Row>
    );
  }
}
