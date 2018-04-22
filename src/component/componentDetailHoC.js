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
    if (!_.isNull(this.state.data) || _.isEmpty(this.state.name)) {
      return;
    }
    getComponent({ name: this.state.name })
      .then(({ data }) => {
        this.setState({ data });
      });
  }

  render() {
    return (
      this.state.data && <ComponentDetail name={this.state.name} {...this.state.data} />
    );
  }
}
