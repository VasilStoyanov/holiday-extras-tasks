import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';


import Header from './../components/header';
import Drawer from './../components/drawer';
import Content from './content';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
          <Header />
          <Drawer />
          <Content />
        </div>
      </Router>
    );
  }
}


export default App;
