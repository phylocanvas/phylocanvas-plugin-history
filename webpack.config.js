module.exports = {
  entry: [
    './dev/index.js',
  ],
  output: {
    filename: 'history-dev.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /webpack/, loader: 'babel?stage=0' },
    ],
  },
};
