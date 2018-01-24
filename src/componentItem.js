import React, { Component } from 'react';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <section className="markdown">
          <h2>{this.props.name || 'placeholder Name'}</h2>
        </section>
      </div>);
  }
}
