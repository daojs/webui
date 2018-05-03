import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import ComponentDetail from './component/componentDetailHoC';
import RegistryStudio from './component/registryStudio';
import Home from './component/home';
import Frame from './component/frame';

function HomeHoC() {
  return (
    <Home registryLink="/registry" />
  );
}

export default function App() {
  return (
    <HashRouter>
      <Frame>
        <Route exact path="/" component={HomeHoC} />
        <Route
          path="/registry/:componentName*"
          component={RegistryStudio}
        />
        <Route
          path="/detail/:componentName*"
          component={ComponentDetail}
        />
      </Frame>
    </HashRouter>
  );
}
