import path from 'path';
import config from './webpack/config.js';

const base = {
  target: 'electron',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: ['babel-loader'] }
    ]
  }
};

module.exports = Object.assign({}, base, config );