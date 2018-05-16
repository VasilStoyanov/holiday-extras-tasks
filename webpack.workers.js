const webpack = require('webpack');
const glob = require('glob');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { logger } = require('./server/utils/logger/logger');

const WEB_WORKERS_PROCESS_STARTED_MESSAGE = '> Started processing web workers...';

let env;
if (process.env.NODE_ENV) {
  env = (process.env.NODE_ENV).trim();
}

const logMessage = logger({
  printer: console,
  method: 'info',
  colourKey: 'help',
});

const toObject = (paths) => {
  const ret = {};

  paths.forEach((path) => {
    ret[path.split('/').slice(-1)[0]] = path;
  });

  return ret;
};

const workerPaths = glob.sync('./client/workers/*.js');
const entry = toObject(workerPaths);

logMessage(WEB_WORKERS_PROCESS_STARTED_MESSAGE);

const configuration = {
  entry,
  output: {
    filename: '[name]',
    path: `${__dirname}/client/dist_workers`,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
};

if (env === 'production') {
  configuration.plugins.push(new UglifyJSPlugin({
    sourceMap: true,
  }));
}

module.exports = configuration;
