import React, { Component } from 'react';
import { Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getComponents } from './repository';
import ComponentList from './componentList';

const { Search } = Input;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { components: [] };
    this.search = this.search.bind(this);
  }

  search(query) {
    return getComponents({ query })
      .then((ret) => {
        this.setState({
          components: ret,
        });
      });
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Search
          placeholder="search component"
          onSearch={this.search}
          enterButton
          style={{
            width: '30%',
            minWidth: '400px',
          }}
        />
        <Button style={{ marginLeft: '20px' }}>
          <Link to={{ pathname: this.props.registryLink }}>Registry New Component</Link> { //eslint-disable-line
          }
        </Button>
        <ComponentList
          style={{
            width: '80%',
          }}
          components={this.state.components}
        />
      </div>
    );
  }
}
