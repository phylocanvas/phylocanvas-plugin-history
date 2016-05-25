const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const loaders = [
  { test: /\.js$/,
    exclude: /(webpack|node_modules)/,
    loader: 'babel',
    query: {
      presets: [ 'es2015', 'stage-0' ],
    },
  },
  { test: /\.css$/, loader: 'style!css!postcss' },
  { test: /\.svg$/, loader: 'url?limit=999999' },
];

const commonConfig = {
  module: {
    loaders,
  },
  postcss() {
    return [ autoprefixer ];
  },
};

const devConfig = Object.assign({}, commonConfig, {
  entry: './dev/index.js',
  devtool: '#eval-source-map',
  debug: true,
  output: {
    filename: 'history-dev.js',
    libraryTarget: 'umd',
  },
});

const commonProdConfig = Object.assign({}, commonConfig, {
  externals: 'phylocanvas',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
});

const styledConfig = Object.assign({}, commonProdConfig, {
  entry: './src/styled.js',
  output: {
    libraryTarget: 'umd',
    filename: 'index.js',
  },
});

const unstyledConfig = Object.assign({}, commonProdConfig, {
  entry: './src/unstyled.js',
  output: {
    libraryTarget: 'umd',
    filename: 'unstyled.js',
  },
});

const buildConfig = [ styledConfig, unstyledConfig ];

const isBuild = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

module.exports = isBuild ? buildConfig : devConfig;
