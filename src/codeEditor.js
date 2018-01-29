import React, { Component } from 'react';
import MonacoEditor from 'react-monaco-editor'; // eslint-disable-line
import PropTypes from 'prop-types';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(newValue) {
    this.props.onChange(newValue);
  }

  render() {
    return (
      <div>
        <div style={{
            outline: '1px solid #eee',
            height: '700px',
          }}
        >
          <MonacoEditor
            theme="vs"
            options={{
              minimap: {
                enabled: false,
              },
              automaticLayout: true,
            }}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}


Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
};
