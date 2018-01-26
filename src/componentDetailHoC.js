import React, { Component } from 'react';
import _ from 'lodash';
import ComponentDetail from './componentDetail';
import { getComponentMetadata, getComponentSource, getComponentReadme } from './repository';

export default class extends Component {
  constructor(props) {
    super(props);
    const componentName = _.get(this.props, 'match.params.componentName');
    const [name, version] = componentName.split('@');
    this.version = version;
    this.name = name;
    this.state = {
      name,
      version,
      description: '',
      dependencies: {},
      source: { isUrl: false, data: '' },
      readme: '',
    };
  }

  componentWillMount() {
    getComponentMetadata({ name: this.name, version: this.version })
      .then(({ data }) => {
        this.setState({
          description: data.description,
          version: data.version,
          dependencies: data.dependencies,
        });
      });
    getComponentSource({ name: this.name, version: this.version })
      .then(({ data }) => {
        this.setState({
          source: data,
        });
      });
    getComponentReadme({ name: this.name, version: this.version })
      .then(({ data }) => {
        this.setState({
          readme: data,
        });
      });
  }

  render() {
    return (<ComponentDetail {...this.state} />);
  }
}
