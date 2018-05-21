const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const Ddos = require('ddos');

const ddos = new Ddos();
const distPath = path.join(__dirname, './../../../client/dist/');
const distWorkersPath = path.join(__dirname, './../../../client/dist_workers/');

const applyTo = (app) => {
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(ddos.express);

  // Allow CORS
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.use('/', express.static(distPath));
  app.use('/utils/webworkers/', express.static(distWorkersPath));
};

module.exports = {
  applyTo,
};
