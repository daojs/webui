import React, { Component } from 'react';
import { Form, Input, Radio } from 'antd';
import _ from 'lodash';
import Editor from './editor';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUrl: props.isUrl ? 1 : 0,
      content: props.content || props.placeholder,
    };
    this.values = {};
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isUrl: nextProps.isUrl ? 1 : 0,
      content: nextProps.content || nextProps.placeholder,
    });
  }

  onChange(newValue) {
    if (_.isFunction(this.props.onChange)) {
      this.props.onChange({
        ...newValue,
        isUrl: newValue.isUrl > 0,
      });
    }
  }

  onSelectChanged(e) {
    this.setState((prevState) => {
      this.values[prevState.isUrl] = prevState.content;
      const newState = {
        isUrl: e.target.value,
        content: this.values[e.target.value] || '',
      };
      this.onChange(newState);
      return newState;
    });
  }

  onContentChange(content) {
    this.onChange({
      ...this.state,
      content,
    });
    this.setState({
      content,
    });
  }

  render() {
    const { isUrl } = this.state;

    let inputControl = (<Input
      value={this.state.content}
      onChange={e => this.onContentChange(e.target.value)}
    />);

    if (!isUrl) {
      inputControl = (<Editor
        hasPreview={this.props.hasPreview}
        language={this.props.language}
        content={this.state.content}
        onChange={newValue => this.onContentChange(newValue)}
      />);
    }

    return (
      <div>
        <Form.Item layout="inline">
          {this.props.label}:&nbsp;&nbsp;
          <Radio.Group value={isUrl} onChange={this.onSelectChanged}>
            <Radio.Button value={0}>Source Code</Radio.Button>
            <Radio.Button value={1}>Url</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item layout="inline">
          { inputControl }
        </Form.Item>
      </div>
    );
  }
}
