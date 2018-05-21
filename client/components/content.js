import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import UserTable from '././../containers/userTable';
import FlickrData from './../containers/flickrData';

const Content = () => (
  <main className="mdl-layout__content">
    <div className="page-content">

      <Route exact path="/" component={FlickrData} />
      <Route exact path="/users" component={UserTable} />

    </div>
  </main>
);


export default withRouter(Content);
