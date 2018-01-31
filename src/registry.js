import React, { Component } from 'react';
import { parseModule as esprimaParsemodule } from 'esprima';
import { Form, Button, Input, InputNumber, Select, Tabs } from 'antd';
import _ from 'lodash';
import CodeEditor from './codeEditor';

const { Option } = Select;
const { TabPane } = Tabs;

function props2State(props) {
  return {
    name: (props.name && props.name.substr(2)) || '',
    type: props.type || 'es2015',
    description: props.description,
    dependencies: props.dependencies || [],
    source: props.source,
    readme: props.readme,
    demo: props.demo || { isDemo: true, type: 'es2015' },
  };
}

function resolveDependencies(code, deps = []) {
  try {
    const dependencies = _.chain(esprimaParsemodule(code, { jsx: true }).body)
      .filter(syntaxTreeNode => syntaxTreeNode.type === 'ImportDeclaration')
      .map(({ source: { value: name } }) => {
        if (!name) {
          return null;
        }
        const isComponent = _.startsWith(name, '@');
        const { version } = _.find(deps, { name }) || { version: isComponent ? 0 : '*' };
        return {
          name,
          isComponent,
          version,
        };
      })
      .compact()
      .value();
    return dependencies;
  } catch (e) {
    return [];
  } //eslint-disable-line
}

class Registry extends Component {
  constructor(props) {
    super(props);
    this.types = this.props.types || ['es2015'];
    this.state = props2State(props);
    this.onSourceChange = this.onSourceChange.bind(this);
    this.onDemoChange = this.onDemoChange.bind(this);
    this.onChange = props.onChange || _.noop;
  }

  componentWillReceiveProps(props) {
    this.setState(props2State(props));
  }

  onSourceChange(source) {
    const dependencies = resolveDependencies(source, this.state.dependencies);
    if (dependencies.length > 0) {
      this.onChange({
        source,
        dependencies,
      });
    } else {
      this.onChange({ source });
    }
  }

  onDemoChange(demoSource) { // TODO: update demo config, dependiencies and so on
    this.onChange({
      demo: _.defaults({
        type: 'es2015',
        isDemo: true,
        source: demoSource,
        dependencies: resolveDependencies(demoSource),
      }, this.state.demo),
    });
  }

  getComponentConfig() {
    return {
      ...this.state,
      name: `@/${this.state.name}`,
      demo: {
        name: `@/${this.state.name}/demo`,
        ...this.state.demo,
      },
    };
  }

  render() {
    const { dependencies } = this.state;
    const sourceEditor = (
      <CodeEditor
        language="javascript"
        value={this.state.source}
        onChange={this.onSourceChange}
      />);
    const readmeEditor = (
      <CodeEditor
        language="markdown"
        value={this.state.readme}
        onChange={(readme) => { this.onChange({ readme }); }}
      />);
    const demoEditor = (
      <CodeEditor
        language="javascript"
        value={this.state.demo.source}
        onChange={this.onDemoChange}
      />);

    return (
      <div style={this.props.style}>
        <Form layout="inline">
          <Form.Item label="Name">
            <Input
              prefix="@/"
              value={this.state.name}
              onChange={(e) => {
                this.onChange({
                  name: `@/${e.target.value}`,
                });
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
              value={this.state.type}
              onChange={(type) => { this.onChange({ type }); }}
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
              value={this.state.description}
              onChange={(e) => { this.onChange({ description: e.target.value }); }}
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
                    value={version}
                    onChange={(num) => {
                      this.onChange({
                        dependencies: _.map(dependencies, (d, idx) => (
                          idx === index ?
                            _.defaults({ version: num }, d) : d
                        )),
                      });
                    }}
                  />) : (
                    <Input
                      value={version}
                      onChange={(e) => {
                        this.onChange({
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
              type="secondary"
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
