import React, { Component } from 'react';
import _ from 'lodash';
import ComponentDetail from './componentDetail';
import { getComponent } from './repository';

export default class extends Component {
  constructor(props) {
    super(props);
    const name = _.get(this.props, 'match.params.componentName');
    this.name = name;
    this.state = {
      name,
      description: '',
      dependencies: {},
      source: '',
      demo: '',
      readme: '',
    };
  }

  componentWillMount() {
    getComponent({ name: this.name })
      .then(({ data }) => {
        this.setState(data);
      });
  }

  render() {
    return (<ComponentDetail {...this.state} />);
  }
}
