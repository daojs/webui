import React, { Component } from 'react';
import ComponentItem from './componentItem';

export default class extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    this.version = 0;
    this.name = item;
    this.state = {
      name: item,
      description: '',
    };
  }

  render() {
    return (<ComponentItem {...this.state} />);
  }
}
