import React, { Component } from 'react';
import ComponentItem from './componentItem';
import { getComponent } from './repository';

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

  componentWillMount() {
    getComponent({ name: this.name, version: this.version })
      .then(({ data }) => {
        this.setState({
          description: data.description,
        });
      });
  }

  render() {
    return (<ComponentItem {...this.state} />);
  }
}
