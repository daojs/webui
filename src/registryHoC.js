import React, { Component } from 'react';
import _ from 'lodash';
import Registry from './registry';
import { postComponent, getComponent } from './repository';

function convertDependencies(dependencies) {
  return _.chain(dependencies)
    .toPairs()
    .map(pair => ({ name: pair[0], version: pair[1] }))
    .value();
}

export default class RegistryHoC extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
  }

  componentWillMount() {
    const name = _.get(this.props, 'match.params.componentName');
    if (name) {
      getComponent({ name })
        .then(({ data }) => {
          // TODO: send another request to get demo code
          this.setState({
            name,
            description: data.description,
            type: data.type,
            dependencies: convertDependencies(data.dependencies),
            source: data.source,
            readme: data.readme,
          });
        });
    }
  }

  render() {
    return (
      <Registry
        onChange={(newState) => { this.setState(newState); }}
        onSubmit={postComponent}
        onPreview={this.props.onPreview}
        {...this.state}
        style={{
          padding: '20px',
        }}
      />
    );
  }
}
