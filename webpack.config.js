/* eslint es6: false */
var webpack = require('webpack');
var isBuild = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

module.exports = {
  entry: isBuild ? './src/index.js': './dev/index.js',
  output: {
    filename: isBuild ? 'index.js' : 'history-dev.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /webpack/, loader: 'babel?stage=0' },
    ],
  },
  externals: isBuild ? 'PhyloCanvas' : null,
  plugins: isBuild ? [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ] : null
};
