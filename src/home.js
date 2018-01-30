import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { search } from './repository';
import ComponentList from './componentList';
import ComponentSearch from './componentSearchHoC';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], showResults: false };
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(query) {
    return search({ query })
      .then((items) => {
        this.setState({
          items,
          showResults: true,
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
        flexDirection: 'column',
      }}
      >
        <div style={{
          flexDirection: 'row',
        }}
        >
          <ComponentSearch
            placeholder="search component"
            onSearch={this.onSearch}
            style={{
              width: '30%',
              minWidth: '400px',
            }}
          />
          <Button style={{ marginLeft: '20px' }}>
            <Link to={{ pathname: this.props.registryLink }}>Registry New Component</Link> { //eslint-disable-line
            }
          </Button>
        </div>
        <ComponentList
          items={this.state.items}
          showResults={this.state.showResults}
        />
      </div>
    );
  }
}
