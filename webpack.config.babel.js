import webpack from 'webpack';
import path from 'path';
import config from './webpack/config.js';

const PATHS = {
  path: path.join(__dirname, 'dist'),
  build: path.join(__dirname, 'src/dist'),
  publicPath: 'http://localhost:8080/dist'
};

const base = {
  target: 'electron',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index.js'
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  output: {
    path: PATHS.build,
    publicPath: PATHS.publicPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['react-hot-loader/webpack', 'babel-loader'] }
    ]
  }
};

module.exports = Object.assign({}, base, config );