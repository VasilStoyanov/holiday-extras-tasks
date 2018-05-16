/* global document */

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

const rootContainer = document.getElementById('root');

const render = (Component) => {
  ReactDOM.render(
    <Component />,
    rootContainer,
  );
};

render(App);

if (module.hot) {
  module.hot.accept(App, () => {
    render(App);
  });
}
