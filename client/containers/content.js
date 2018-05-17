import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { getAllUsers } from './../actions/userActions';

class Content extends Component {
  render() {
    return (
      <main className="mdl-layout__content">
        <div className="page-content">

          <Route exact path="/" component={() => (<div>Home</div>)} />
          <Route exact path="/users" component={() => (<div>Users</div>)} />

        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userReducer,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => {
    console.log('CLICKED !');
    dispatch(getAllUsers());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
