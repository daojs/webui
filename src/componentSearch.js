import React, { Component } from 'react';
import { AutoComplete, Input } from 'antd';
import _ from 'lodash';

const { Search } = Input;

function filterOption(inputValue, { props }) {
  // const fold = _.last(inputValue.split('/'));
  return _.startsWith(props.children, inputValue);
}

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      value: props.value || '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentWillMount() {
    this.updateDataSource('');
  }

  onChange(value) {
    const { onChange = _.identity } = this.props;
    this.setState({ value });
    onChange(value);
  }

  onSearch(value) {
    this.updateDataSource(value);
  }

  onSearchComponents = (value) => {
    this.setState({
      dataSource: [],
    });
    if (_.isFunction(this.props.onSearchComponents)) {
      this.props.onSearchComponents(value);
    }
  }

  updateDataSource(value) {
    const { fetchSuggestion = _.identity } = this.props;
    fetchSuggestion({ query: value, dataSource: this.state.dataSource }, (dataSource) => {
      this.setState({ dataSource });
    });
  }

  render() {
    const { placeholder, style } = this.props;
    let inputType = null; // default is input
    if (_.isFunction(this.props.onSearchComponents)) {
      inputType = (
        <Search
          enterButton={false}
          onSearch={this.onSearchComponents}
        />);
    }
    return (
      <AutoComplete
        dataSource={this.state.dataSource}
        value={this.state.value}
        filterOption={filterOption}
        onChange={this.onChange}
        onSearch={this.onSearch}
        onSelect={this.onSelect}
        placeholder={placeholder}
        defaultActiveFirstOption={false}
        style={style}
        backfill
      >
        {inputType}
      </AutoComplete>
    );
  }
}
