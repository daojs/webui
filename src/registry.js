import React, { Component } from 'react';
import { parseModule as esprimaParsemodule } from 'esprima';
import { Form, Button, Input, InputNumber, Select, Tabs } from 'antd';
import _ from 'lodash';
import CodeEditor from './codeEditor';

const { Option } = Select;
const { TabPane } = Tabs;

class Registry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dependencies: props.dependencies || [],
    };
    this.source = props.source;
    this.demo = props.demo;
    this.readme = props.readme;
    this.name = (props.name && props.name.substr(2)) || '';
    this.description = props.description || '';
    this.types = this.props.types || ['es2015'];
    this.type = props.type || _.first(this.types);
    this.onSourceChange = this.onSourceChange.bind(this);
  }

  onSourceChange(source) {
    this.source = source;
    try {
      const dependencies = _.chain(esprimaParsemodule(source, { jsx: true }).body)
        .filter(syntaxTreeNode => syntaxTreeNode.type === 'ImportDeclaration')
        .map(({ source: { value: name } }) => {
          if (!name) {
            return null;
          }
          const isComponent = _.startsWith(name, '@');
          const { version } = _.find(this.state.dependencies, { name }) || { version: isComponent ? 0 : '*' };
          return {
            name,
            isComponent,
            version,
          };
        })
        .compact()
        .value();
      this.setState({
        dependencies,
      });
    } catch (e) {} //eslint-disable-line
  }

  getComponentConfig() {
    return {
      name: `@/${this.name}`,
      source: this.source,
      demo: this.demo,
      readme: this.readme,
      type: this.type,
      dependencies: _.reduce(
        this.state.dependencies,
        (memo, { version, name }) => (
          _.assign(memo, {
            [name]: version,
          }) : memo
        ), {},
      ),
    };
  }

  render() {
    const { dependencies } = this.state;
    const sourceEditor = (
      <CodeEditor
        language="javascript"
        value={this.source}
        onChange={this.onSourceChange}
      />);
    const readmeEditor = (
      <CodeEditor
        language="markdown"
        value={this.readme}
        onChange={(readme) => { this.readme = readme; }}
      />);
    const demoEditor = (
      <CodeEditor
        language="javascript"
        value={this.demo}
        onChange={(demo) => { this.demo = demo; }}
      />);

    return (
      <div style={this.props.style}>
        <Form layout="inline">
          <Form.Item label="Name">
            <Input
              addonBefore="@/"
              defaultValue={this.name}
              onChange={(e) => {
                this.name = e.target.value;
              }}
            />
          </Form.Item>
        </Form>
        <Form layout="inline">
          <Form.Item label="Type">
            <Select
              style={{
                width: '100px',
              }}
              value={this.type}
              onChange={(type) => { this.type = type; }}
            >
              {_.map(this.types, type => (<Option value={type} key={type}>{type}</Option>))}
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
              defaultValue={this.description}
              onChange={(e) => { this.description = e.target.value; }}
            />
          </Form.Item>
        </Form>
        <Form layout="inline">
          <Form.Item label="Dependencies" />
        </Form>
        {
          _.map(dependencies, ({ version, name, isComponent }, index) => (
            <Form layout="inline" key={index}>
              <Form.Item label="component">
                <Input
                  value={name}
                  disabled
                />
              </Form.Item>
              <Form.Item label="minVersion">
                {
                  isComponent ? (<InputNumber
                    defaultValue={version}
                    onChange={(num) => {
                      this.setState({
                        dependencies: _.map(dependencies, (d, idx) => (
                          idx === index ?
                            _.defaults({ version: num }, d) : d
                        )),
                      });
                    }}
                  />) : (
                    <Input
                      defaultValue={version}
                      onChange={(e) => {
                        this.setState({
                          dependencies: _.map(dependencies, (d, idx) => (
                            idx === index ?
                              _.defaults({ version: e.target.value }, d) : d
                          )),
                        });
                      }}
                    />
                  )
                }
              </Form.Item>
            </Form>
            ))
        }
        <Form layout="vertical">
          <Form.Item>
            <Tabs defaultActiveKey="source" onChange={() => {}}>
              <TabPane tab="Source" key="source">{sourceEditor}</TabPane>
              <TabPane tab="README" key="readme">{readmeEditor}</TabPane>
              <TabPane tab="Demo" key="demo">{demoEditor}</TabPane>
            </Tabs>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                if (_.isFunction(this.props.onSubmit)) {
                  this.props.onSubmit(this.getComponentConfig());
                }
              }}
            >
              Sumbit
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (_.isFunction(this.props.onPreview)) {
                  this.props.onPreview(this.getComponentConfig());
                }
              }}
            >
              Preview
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Registry;
