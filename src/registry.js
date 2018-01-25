import React, { Component } from 'react';
import { Form, Button, Input, Select } from 'antd';
import _ from 'lodash';
import InputUrlContent from './inputUrlContent';

const { Option } = Select;
class Registry extends Component {
  constructor(props) {
    super(props);
    console.log(`the props in registry is: ${JSON.stringify(props)}`);  //eslint-disable-line
    this.state = {
      name: '',
      type: 'js',
      description: '',
      dependencies: [],
      source: {
        isUrl: false,
        content: '',
      },
      sourceDebug: {
        isUrl: false,
        content: '',
      },
      readme: {
        isUrl: false,
        content: '',
      },
    };
  }

  render() {
    const { dependencies } = this.state;
    const { types = ['js', 'es2015'] } = this.props;
    const addDeps = (
      <Form.Item>
        <Button
          type="primary"
          icon="plus"
          shape="circle"
          onClick={() => {
            this.setState({
              dependencies: this.state.dependencies.concat([
                {
                  variable: '',
                  name: '',
                  version: [],
                },
              ]),
            });
          }}
        />
      </Form.Item>
    );

    return (
      <div>
        <Form layout="inline">
          <Form.Item label="Name">
            <Input
              value={this.state.name}
              onChange={(e) => {
                this.setState({
                  name: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Form>
        <Form layout="inline">
          <Form.Item label="Type">
            <Select
              value={this.state.type}
              onChange={(type) => {
                this.setState({
                  type,
                });
              }}
            >
              {_.map(types, type => (<Option value={type} key={type}>{type}</Option>))}
            </Select>
          </Form.Item>
        </Form>
        <Form layout="inline">
          <Form.Item label="Description">
            <Input.TextArea
              rows="2"
              value={this.state.description}
              onChange={(e) => {
                this.setState({
                  description: e.target.value,
                });
              }}
            />
          </Form.Item>
        </Form>
        <Form layout="inline">
          <Form.Item label="Dependencies">
            { dependencies.length > 0 ? null : addDeps }
          </Form.Item>
        </Form>
        {
          _.map(dependencies, ({ variable, name }, index) => (
            <Form layout="inline" key={index}>
              <Form.Item>
                <Button
                  type="danger"
                  icon="close"
                  shape="circle"
                  onClick={() => {
                    this.setState({
                      dependencies: _.reject(dependencies, (d, idx) => idx === index),
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="import">
                <Input
                  value={variable}
                  onChange={(e) => {
                    this.setState({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({ variable: e.target.value }, d) : d
                      )),
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="from">
                <Input
                  value={name}
                  onChange={(e) => {
                    this.setState({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({
                          name: e.target.value,
                          }, d) : d
                      )),
                    });
                  }}
                />
              </Form.Item>
              { addDeps }
            </Form>
            ))
        }
        <Form layout="vertical">
          <Form.Item>
            <InputUrlContent
              label="Source"
              {...this.state.source}
              onChange={(newSource) => {
                this.setState({
                  source: newSource,
                });
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <InputUrlContent
              {...this.state.sourceDebug}
              label="Source Debug"
              onChange={(value) => {
                this.setState({
                  sourceDebug: value,
                });
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <InputUrlContent
              label="ReadMe"
              hasPreview
              {...this.state.readme}
              onChange={(value) => {
                this.setState({
                  readme: value,
                });
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                const { name, source, dependencies: deps } = this.state;
                if (name && source && _.isFunction(this.props.onSubmit)) {
                  this.props.onSubmit({
                    name,
                    source,
                    dependencies: _.reduce(deps, (memo, { variable, name: entry }) => (
                      variable && entry ? _.assign(memo, {
                        [entry]: variable,
                      }) : memo
                    ), {}),
                  });
                }
              }}
            >
              Sumbit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Registry;
