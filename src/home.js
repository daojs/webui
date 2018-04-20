import React, { Component } from 'react';
import { search } from './repository';
import ComponentList from './componentList';
import ComponentSearch from './componentSearch';
import HomeLayout from './home-layout';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [], showResults: false };
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

    return (
      <HomeLayout LeftComp={LeftComp} />
    );
  }
}
