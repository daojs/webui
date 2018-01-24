import React, { Component } from 'react';
import { Form, Button, Input } from 'antd';
import _ from 'lodash';

class Registry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dependencies: [],
      content: '',
    };
  }

  render() {
    const { dependencies } = this.state;
    const addDeps = (
      <Form.Item>
        <Button
          type="primary"
          icon="plus"
          shape="circle"
          onClick={() => {
            this.setState(_.defaults({
              dependencies: this.state.dependencies.concat([
                {
                  variable: '',
                  name: '',
                  version: [],
                },
              ]),
            }, this.state));
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
                this.setState(_.defaults({
                  name: e.target.value,
                }, this.state));
              }}
            />
          </Form.Item>
        </Form>
        { dependencies.length > 0 ? null : addDeps }
        {
          _.map(dependencies, ({ variable, name }, index) => (
            <Form layout="inline" key={index}>
              <Form.Item>
                <Button
                  type="danger"
                  icon="close"
                  shape="circle"
                  onClick={() => {
                    this.setState(_.defaults({
                      dependencies: _.reject(dependencies, (d, idx) => idx === index),
                    }, this.state));
                  }}
                />
              </Form.Item>
              <Form.Item label="import">
                <Input
                  value={variable}
                  onChange={(e) => {
                    this.setState(_.defaults({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({ variable: e.target.value }, d) : d
                      )),
                    }, this.state));
                  }}
                />
              </Form.Item>
              <Form.Item label="from">
                <Input
                  value={name}
                  onChange={(e) => {
                    this.setState(_.defaults({
                      dependencies: _.map(dependencies, (d, idx) => (
                        idx === index ? _.defaults({
                          name: e.target.value,
                          }, d) : d
                      )),
                    }, this.state));
                  }}
                />
              </Form.Item>
              { addDeps }
            </Form>
            ))
        }
        <Form layout="vertical">
          <Form.Item label="Content">
            <Input.TextArea
              value={this.state.content}
              onChange={(e) => {
                this.setState(_.defaults({
                  content: e.target.value,
                }, this.state));
              }}
              rows="15"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                const { name, content, dependencies: deps } = this.state;
                if (name && content && _.isFunction(this.props.onSubmit)) {
                  this.props.onSubmit({
                    name,
                    content,
                    dependencies: _.reduce(deps, (memo, { variable, entry }) => (
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
