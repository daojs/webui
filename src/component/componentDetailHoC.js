import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ComponentDetail from './componentDetail';
import { getComponent } from '../repository';

export default class extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.name === prevState.name) {
      return null;
    }
    return {
      name: nextProps.name,
      data: null,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      data: null,
    };
  }

  componentDidUpdate() {
    this.loadData();
  }

  loadData() {
    const { name, data } = this.state;
    if (!_.isNull(data) || _.isEmpty(name)) {
      return;
    }
    Promise.all([
      getComponent({ name }),
      getComponent({ name: `${name}/demo` }),
    ]).then(([
      { data: self },
      { data: demo },
    ]) => {
      this.setState({
        data: { ...self, demo: { ...demo } },
      });
    });
  }

  render() {
    return (
      this.state.data && <ComponentDetail name={this.state.name} {...this.state.data} />
    );
  }
}
