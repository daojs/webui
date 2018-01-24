import React, { Component } from 'react';
import { Form, Input, Radio } from 'antd';
import _ from 'lodash';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUrl: props.isUrl ? 1 : 0,
      content: props.content,
    };
    this.values = {};
    this.onSelectChanged = this.onSelectChanged.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
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

  onContentChange(e) {
    this.onChange({
      ...this.state,
      content: e.target.value,
    });
    this.setState({
      content: e.target.value,
    });
  }

  render() {
    const { isUrl } = this.state;

    let inputControl = (<Input
      value={this.state.content}
      onChange={this.onContentChange}
    />);

    if (!isUrl) {
      inputControl = (
        <Input.TextArea
          value={this.state.source}
          onChange={(e) => {
            this.setState(_.defaults({
              source: e.target.value,
            }, this.state));
          }}
          rows="15"
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
