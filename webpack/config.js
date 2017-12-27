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
  destination: path.join(__dirname, '../build/index.html'),
  build: IS_PRODUCTION ? path.join(__dirname, '../build') : path.join(__dirname, 'src/build'),
  publicPath: 'http://localhost:8080/build'
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
    path: PATHS.build,
  },
  // this node field is needed to allow electron-builder to work
  // https://github.com/electron/electron/issues/5107
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    environmentPlugin,
    new CopyWebpackPlugin([
      {
        from: PATHS.template,
        to: PATHS.destination
      },
      {
        from: path.join(__dirname, '../src/package.json'),
        to: path.join(__dirname, '../build/package.json')
      },
      {
        from: path.join(__dirname, '../src/main.js'),
        to: path.join(__dirname, '../build/main.js')
      }
      ]),
    new UglifyJSPlugin()
  ]
};

module.exports = IS_PRODUCTION ? productionConfig : developmentConfig;
