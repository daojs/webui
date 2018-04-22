import React, { Component } from 'react';
import _ from 'lodash';
import Promise from 'bluebird';
import Registry from './registry';
import { postComponent, getComponent } from '../repository';

function dependencies2Client(dependencies) {
  return _.chain(dependencies)
    .toPairs()
    .map(pair => ({ name: pair[0], version: pair[1] }))
    .value();
}

function dependencies2Server(deps) {
  return _.reduce(
    deps,
    (memo, { version, name }) => (
      _.assign(memo, {
        [name]: version,
      }) : memo
    ), {},
  );
}

function onSubmit(data) {
  const component = _.omit(data, 'demo');
  const { demo } = data;
  component.dependencies = dependencies2Server(component.dependencies);
  demo.dependencies = dependencies2Server(demo.dependencies);
  demo.name = `${component.name}/demo`;
  return Promise.each([component, demo], comp => postComponent(comp));
}

export default class RegistryHoC extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false };
    this.onPreview = this.onPreview.bind(this);
  }

  componentWillMount() {
    const name = _.get(this.props, 'match.params.componentName');
    if (name) {
      getComponent({ name })
        .then(({ data: component }) => {
          this.setState({
            name,
            ...component,
            dependencies: dependencies2Client(component.dependencies),
          });
          const { demoList = [`${name}/demo`] } = component; // TODO: only one demo currently
          return Promise.each(demoList, (demoName) => {
            getComponent({ name: demoName }).then(({ data: demo }) => {
              this.setState({
                demo: {
                  name: demoName,
                  ...demo,
                  dependencies: dependencies2Client(demo.dependencies),
                },
              });
            });
          }).catch(() => {});
        });
    }
  }

  onPreview(data) {
    onSubmit(data).then(() => {
      if (_.isFunction(this.props.onPreview)) {
        this.props.onPreview(data);
      }
    });
  }

  render() {
    return (
      <Registry
        onChange={(newState) => { this.setState(newState); }}
        onSubmit={onSubmit}
        onPreview={this.onPreview}
        {...this.state}
        style={{
          padding: '20px',
        }}
      />
    );
  }
}
