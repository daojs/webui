import React, { Component } from 'react';
import { Form, Button, Input, Select } from 'antd';
import _ from 'lodash';
import InputUrlContent from './inputUrlContent';
import ComponentSearch from './componentSearchHoC';

const { Option } = Select;

function props2State(props) {
  const {
    name = '',
    type = 'es2015',
    description = '',
    dependencies = [],
    source = {
      isUrl: false,
      data: '',
    },
    sourceDebug = {
      isUrl: false,
      data: '',
    },
    readme = {
      isUrl: false,
      data: '',
    },
  } = props;
  return {
    name,
    type,
    description,
    dependencies,
    source,
    sourceDebug,
    readme,
  };
}

class Registry extends Component {
  constructor(props) {
    super(props);
    this.state = props2State(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(props2State(nextProps));
  }

  render() {
    const { dependencies } = this.state;
    const { types = ['es2015'] } = this.props;
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
              style={{
                width: '400px',
              }}
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
                <ComponentSearch
                  value={name}
                  onChange={(value) => {
                    this.setState({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({
                          name: value,
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
              language="javascript"
              isUrl={this.state.source.isUrl}
              content={this.state.source.data}
              placeholder="//Input javascript code here"
              onChange={(value) => {
                this.setState({
                  source: {
                    isUrl: value.isUrl,
                    data: value.content,
                  },
                });
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <InputUrlContent
              isUrl={this.state.sourceDebug.isUrl}
              content={this.state.sourceDebug.data}
              label="Source Debug"
              language="javascript"
              placeholder="//Input javascript code here"
              onChange={(value) => {
                this.setState({
                  sourceDebug: {
                    isUrl: value.isUrl,
                    data: value.content,
                  },
                });
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <InputUrlContent
              label="ReadMe"
              hasPreview
              language="markdown"
              isUrl={this.state.readme.isUrl}
              content={this.state.readme.data}
              placeholder="//Input markdown code"
              onChange={(value) => {
                this.setState({
                  readme: {
                    isUrl: value.isUrl,
                    data: value.content,
                  },
                });
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                if (_.isFunction(this.props.onSubmit)) {
                  this.props.onSubmit({
                    ...this.state,
                    dependencies: _.reduce(
                      this.state.dependencies,
                      (memo, { variable, name: entry }) => (
                        variable && entry ? _.assign(memo, {
                          [entry]: variable,
                        }) : memo
                      ), {},
                    ),
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
