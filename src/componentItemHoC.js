import React, { Component } from 'react';
import ComponentItem from './componentItem';
import { getComponentMetadata } from './repository';

export default class extends Component {
  constructor(props) {
    super(props);
    const { item } = props;
    const [name, version] = item.split('@');
    this.version = version;
    this.name = name;
    this.state = {
      name,
      description: '',
    };
  }

  componentWillMount() {
    getComponentMetadata({ name: this.name, version: this.version })
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
