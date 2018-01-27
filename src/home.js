import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { getComponentChildren } from './repository';
import ComponentList from './componentList';
import ComponentSearch from './componentSearchHoC';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], showResults: false };
    this.search = this.search.bind(this);
  }

  search(query) {
    return getComponentChildren({ query })
      .then(({ data }) => {
        const { version, children = [] } = data;
        const list = _.compact(query.split('/'));
        let items = _.map(children, (item) => {
          const tmp = list.concat(item);
          return tmp.join('/');
        });
        if (version) {
          items = [query].concat(items);
        }
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
            onSearch={this.search}
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
