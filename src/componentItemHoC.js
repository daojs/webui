import React, { Component } from 'react';
import ComponentItem from './componentItem';
import { getComponentMetadata } from './repository';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.item,
      description: '',
    };
  }

  componentWillMount() {
    getComponentMetadata({ name: this.props.item })
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
