const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');

const DEV_SERVER_PORT = 3001;

module.exports = merge(webpackCommonConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/dist/',
    hot: true,
    port: DEV_SERVER_PORT,
    proxy: [{
      context: ['/'],
      target: 'http://localhost:3000',
    }],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
});
