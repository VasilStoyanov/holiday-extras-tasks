import React from 'react';
import { Link } from 'react-router-dom';

const Drawer = () => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">Holiday extras task</span>
    <nav className="mdl-navigation">
      <Link className="mdl-navigation__link" to="/">Flickr API</Link>
      <Link className="mdl-navigation__link" to="/users">Users API</Link>
    </nav>
  </div>
);

export default Drawer;
