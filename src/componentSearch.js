import React, { Component } from 'react';
import { Input } from 'antd';
import PropTypes from 'prop-types';

const { Search } = Input;

export default class extends Component {
  static propTypes = {
    onSearch: PropTypes.func.isRequired,
  }

  onSearch = (event) => {
    this.props.onSearch(event.target.value);
  }

  render() {
    return (
      <Search
        enterButton={false}
        onKeyUp={this.onSearch}
      />
    );
  }
}
