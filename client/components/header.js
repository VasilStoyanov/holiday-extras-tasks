import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Holiday extras tasks</span>
      <div className="mdl-layout-spacer" />
      <nav className="mdl-navigation mdl-layout--large-screen-only">
        <Link className="mdl-navigation__link" to="/">Flickr API</Link>
        <Link className="mdl-navigation__link" to="/users">Users API</Link>
      </nav>
    </div>
  </header>
);

export default Header;
