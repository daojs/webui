import React, { Component } from 'react';
import _ from 'lodash';
import Registry from './registry';
import { createComponent } from './repository';

export default class RegistryHoC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const componentName = _.get(this.props, 'match.params.componentName');
    if (componentName) {
      // TODO: fetch component info to set state
      this.setState({
        source: { content: 'http://test.com', isUrl: true },
      });
    }
  }

  render() {
    return (
      <Registry onSubmit={createComponent} {...this.state} />
    );
  }
}
