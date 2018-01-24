import React, { Component } from 'react';
import ComponentItem from './componentItem';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {this.props.components.map(component => (<ComponentItem {...component} />))}
      </div>);
  }
}
