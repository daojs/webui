import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registry from './registry';
import Home from './home';
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

function RegistryHoC(props) {
  return (
    <Registry onSubmit={options => submit(options)} {...props} />
  );
}

function HomeHoC() {
  return (
    <Home registryLink="/registry" />
  );
}

export default function App() {
  return (
    <HashRouter>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'fixed',
          height: '100%',
          width: '100%',
          marginTop: '20px',
          overflow: 'auto',
        }}
      >
        <div
          style={{ flexBasis: 0, flexGrow: 1, width: '100%' }}
        >
          <Route exact path="/" component={HomeHoC} />
          <Route
            path="/registry/:componentName"
            component={RegistryHoC}
          />
          <Route
            exact
            path="/registry"
            component={RegistryHoC}
          />
        </div>
      </div>
    </HashRouter>
  );
}
