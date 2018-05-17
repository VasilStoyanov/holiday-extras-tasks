/* global document */

import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './containers/app';
import store from './store';

import './../node_modules/material-design-lite/material.min.css';
import './../node_modules/material-design-lite/material.min.js';
import './../node_modules/material-design-icons/iconfont/material-icons.css';

const rootContainer = document.getElementById('root');

const render = (Application) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Application />
      </Provider>
    </AppContainer>,
    rootContainer,
  );
};

render(App);

if (module.hot) {
  module.hot.accept(App, () => {
    render(App);
  });
}
