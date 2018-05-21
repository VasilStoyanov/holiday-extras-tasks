import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './header';
import Drawer from './drawer';
import Content from './content';

const App = () => (
  <Router>
    <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <Header />
      <Drawer />
      <Content />
    </div>
  </Router>
);

export default App;
