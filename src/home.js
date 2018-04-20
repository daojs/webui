import React, { Component } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { search } from './repository';
import ComponentList from './componentList';
import ComponentSearch from './componentSearchHoC';
import HomeLayout from './home-layout';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], showResults: false };
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    search().then((items) => {
      this.setState({
        items,
        showResults: true,
      });
    });
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
    const LeftComp = (
      <div>
        <ComponentSearch
          placeholder="search component"
          onSearch={this.onSearch}
          style={{
            width: '100%',
          }}
        />
        {/* <Button style={{ marginLeft: '20px' }}>
          <Link to={{ pathname: this.props.registryLink }}>Registry New Component</Link> { //eslint-disable-line
          }
        </Button> */}
        <ComponentList
          items={this.state.items}
          showResults={this.state.showResults}
        />
      </div>
    );

    return (
      <HomeLayout LeftComp={LeftComp} />
    );
  }
}
