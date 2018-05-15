const express = require('express');
const appConfig = require('./config');
const routers = require('./routers');
const staticRouter = require('./statics/');

const init = async (data) => {
  const app = express();

  appConfig.applyTo(app);
  routers.attachTo(app, data);
  staticRouter.attachTo(app);

  return app;
};

module.exports = { init };
