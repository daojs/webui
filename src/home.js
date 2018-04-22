import React, { Component } from 'react';
import _ from 'lodash';
import { search } from './repository';
import ComponentList from './componentList';
import ComponentSearch from './componentSearch';
import ComponentDetail from './componentDetailHoC';
import HomeLayout from './home-layout';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showResults: false,
      selectedIndex: 0,
    };
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.onSearch();
  }

  onSearch(query) {
    return search({ query }).then((items) => {
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
        <ComponentList
          items={this.state.items}
          showResults={this.state.showResults}
        />
      </div>
    );

    const RightComp = (
      <ComponentDetail name={_.get(this.state, 'items[0]', '')} />
    );

    return (
      <HomeLayout LeftComp={LeftComp} RightComp={RightComp} />
    );
  }
}
