import React from 'react';

import Registry from './registry';
import { createComponent } from './repository';

function submit({ name, source, dependencies }) {
  return createComponent({
    name,
    source,
    metadata: {
      loader: 'babel',
      dependencies,
    },
  });
}

export default function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        height: '100%',
        width: '50%',
      }}
    >
      <div
        style={{ flexBasis: 0, flexGrow: 1 }}
      >
        <Registry
          onSubmit={options => submit(options)}
        />
      </div>
    </div>
  );
}
