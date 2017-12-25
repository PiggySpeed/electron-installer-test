import webpack from 'webpack';
import path from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const LAUNCH_COMMAND = !!(process.env.NODE_ENV) && process.env.NODE_ENV.trim();
const IS_PRODUCTION = !!(process.env.NODE_ENV) && (process.env.NODE_ENV.trim() === 'production');

// -----------------------------------------------------------------------
// Paths (relative to current directory)

const PATHS = {
  template: path.join(__dirname, '../src/index.html'),
  destination: path.join(__dirname, '../dist/index.html'),
  build: IS_PRODUCTION ? path.join(__dirname, '../dist') : path.join(__dirname, 'src/dist'),
  publicPath: 'http://localhost:8080/dist'
};

// -----------------------------------------------------------------------
// Plugin Definitions

const environmentPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(LAUNCH_COMMAND)
});

// -----------------------------------------------------------------------
// Config Objects

const developmentConfig = {
  devtool: 'source-map',
  devServer: { hot: true },
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.js'
    ]
  },
  output: {
    filename: 'bundle.js',
    path: PATHS.build,
    publicPath: PATHS.publicPath
  },
  plugins: [
    environmentPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

const productionConfig = {
  devtool: 'source-map',
  entry: { app: ['./src/index.js'] },
  output: {
    filename: './bundle.js',
    path: PATHS.build
  },
  plugins: [
    environmentPlugin,
    new CopyWebpackPlugin([{ from: PATHS.template, to: PATHS.destination }]),
    new UglifyJSPlugin()
  ]
};

module.exports = IS_PRODUCTION ? productionConfig : developmentConfig;
