import React, { Component } from 'react';
import Navigation from './navigation';
import UsersTable from './users.table';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Navigation />

            <Route
              exact
              path="/"
              render={() => <div>Home</div>}
            />

            <Route
              exact
              path="/users"
              render={() => <UsersTable />}
            />
          </div>
        </Router>
      </div>
    );
  }
}


export default App;
