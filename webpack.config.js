const webpack = require('webpack');

const loaders = [
  { test: /\.js$/,
    exclude: /webpack/,
    loader: 'babel',
    query: {
      presets: [ 'es2015', 'stage-0' ],
    },
  },
  { test: /\.css$/, loader: 'style!css' },
  { test: /\.svg$/, loader: 'url?limit=999999' },
];

const devConfig = {
  entry: './dev/index.js',
  devtool: '#eval-source-map',
  output: {
    filename: 'history-dev.js',
    libraryTarget: 'umd',
  },
  module: {
    loaders,
  },
};

const commonBuildConfig = {
  module: {
    loaders,
  },
  externals: 'phylocanvas',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
};

const styledConfig = Object.assign({}, commonBuildConfig, {
  entry: './src/styled.js',
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
  },
});

const unstyledConfig = Object.assign({}, commonBuildConfig, {
  entry: './src/unstyled.js',
  output: {
    libraryTarget: 'umd',
    filename: 'unstyled.js',
  },
});

const buildConfig = [ styledConfig, unstyledConfig ];

const isBuild = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

module.exports = isBuild ? buildConfig : devConfig;
