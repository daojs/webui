import React, { Component } from 'react';
import _ from 'lodash';
import { search } from '../repository';
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
  }

  componentDidMount() {
    this.onSearch();
  }

  onSearch = query => search({ query }).then((items) => {
    this.setState({
      items,
      showResults: true,
    });
  })

  onSelect = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  render() {
    const LeftComp = (
      <div>
        <ComponentSearch
          onSearch={this.onSearch}
          style={{ width: '100%' }}
        />
        <ComponentList
          items={this.state.items}
          showResults={this.state.showResults}
          onSelect={this.onSelect}
        />
      </div>
    );

    const RightComp = (
      <ComponentDetail name={_.get(this.state, `items[${this.state.selectedIndex}]`, '')} />
    );

    return (
      <HomeLayout LeftComp={LeftComp} RightComp={RightComp} />
    );
  }
}
