import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentDetail from './componentDetail';
import { getComponent } from './repository';

export default class extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      description: '',
      dependencies: {},
      source: '',
      demo: '',
      readme: '',
    };
  }

  componentWillMount() {
    getComponent({ name: this.state.name })
      .then(({ data }) => {
        this.setState(data);
      });
  }

  render() {
    return (<ComponentDetail {...this.state} />);
  }
}
