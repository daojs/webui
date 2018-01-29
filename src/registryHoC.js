import React, { Component } from 'react';
import _ from 'lodash';
import Registry from './registry';
import { createComponent, getComponentMetadata, getComponentSource, getComponentReadme, getComponentSourceDebug } from './repository';

function convertDependencies(dependencies) {
  return _.chain(dependencies)
    .toPairs()
    .map(pair => ({ name: pair[0], variable: pair[1] }))
    .value();
}

export default class RegistryHoC extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const componentName = _.get(this.props, 'match.params.componentName');
    if (componentName) {
      const [name, version] = componentName.split('@');
      // TODO: use new API to fetch data
      getComponentMetadata({ name, version })
        .then(({ data }) => {
          this.setState({
            name,
            description: data.description,
            type: data.type,
            dependencies: convertDependencies(data.dependencies),
          });
        });
      getComponentSource({ name, version })
        .then(({ data }) => {
          this.setState({
            source: data,
          });
        });
      getComponentSourceDebug({ name, version })
        .then(({ data }) => {
          this.setState({
            sourceDebug: data,
          });
        });
      getComponentReadme({ name, version })
        .then(({ data }) => {
          this.setState({
            readme: data,
          });
        });
    }
  }

  render() {
    return (
      <div>
        <Registry
          style={{
            width: '50%',
            padding: '20px',
          }}
          onSubmit={createComponent}
          {...this.state}
        />
      </div>
    );
  }
}
