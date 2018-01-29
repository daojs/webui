import React from 'react';
import ReactDOM from 'react-dom';

export default function (component, el) {
  ReactDOM.render(<div>{component}</div>, el);
}
