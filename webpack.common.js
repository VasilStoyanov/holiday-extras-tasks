const HtmlPlugin = require('html-webpack-plugin');
const { logger } = require('./server/utils/logger/logger');

const WEBPACK_BUILD_PROCESS_STARTED_MESSAGE = '> Started application build...';

const logInfoMessage = logger({
  printer: console,
  method: 'info',
  colourKey: 'help',
});

logInfoMessage(WEBPACK_BUILD_PROCESS_STARTED_MESSAGE);

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './client/index.js',
  ],
  output: {
    filename: 'app.js',
    path: `${__dirname}/client/dist/`,
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
      },
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: './client/index.html',
    }),
  ],
};
