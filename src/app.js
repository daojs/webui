import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ComponentDetail from './componentDetailHoC';
import Registry from './registryHoC';
import Home from './home';

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
            path="/registry/:componentName*"
            component={Registry}
          />
          <Route
            path="/detail/:componentName*"
            component={ComponentDetail}
          />
        </div>
      </div>
    </HashRouter>
  );
}
