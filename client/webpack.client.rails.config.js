const webpack = require('webpack');
const path = require('path')
const config = require('./webpack.client.base.config');
const devBuild = process.env.NODE_ENV !== 'production';

config.output = {
  filename: '[name]-bundle.js',
  path: '../app/assets/webpack',
};

config.entry.vendor.unshift(
  'es5-shim/es5-shim',
  'es5-shim/es5-sham'
);

config.entry.vendor.push('jquery-ujs');

config.resolve.root = [
  path.resolve('./app')
]

config.module.loaders.push(
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
  },
  {
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass'],
  },
  {
    test: /\.css$/,
    loaders: ['style', 'css'],
  },
  {
    test: require.resolve('react'),
    loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham',
  },
  {
    test: require.resolve('jquery-ujs'),
    loader: 'imports?jQuery=jquery',
  }
);

config.sassLoader = {
  includePaths: [path.resolve(__dirname, './app/stylesheets')]
}

module.exports = config;

if (devBuild) {
  console.log('Webpack dev build for Rails'); // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map';
} else {
  config.plugins.push(
    new webpack.optimize.DedupePlugin()
  );
  console.log('Webpack production build for Rails'); // eslint-disable-line no-console
}
