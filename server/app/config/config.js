const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const Ddos = require('ddos');

const ddos = new Ddos();

const applyTo = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(ddos.express);

  const distPath = path.join(__dirname, './../../../client/dist/');
  const distWorkersPath = path.join(__dirname, './../../../client/dist_workers/');

  app.use('/', express.static(distPath));
  app.use('/utils/webworkers/', express.static(distWorkersPath));
};

module.exports = {
  applyTo,
};