import React, { Component } from 'react';
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
      selectedName: '',
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

  onSelect = (selectedName) => {
    this.setState({ selectedName });
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
      <ComponentDetail name={this.state.selectedName} />
    );

    return (
      <HomeLayout LeftComp={LeftComp} RightComp={RightComp} />
    );
  }
}
