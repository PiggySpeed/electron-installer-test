import webpack from 'webpack';

const LAUNCH_COMMAND = process.env.NODE_ENV;
const IS_PRODUCTION = LAUNCH_COMMAND === 'production' || LAUNCH_COMMAND === 'productionDemo';

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
  plugins: [
    environmentPlugin,
    new webpack.HotModuleReplacementPlugin()
  ]
};

const productionConfig = {
  devtool: 'cheap-module-source-map',
  devServer: {},
  entry: { app: ['./src/index.js'] },
  plugins: [
    environmentPlugin
  ]
};

module.exports = IS_PRODUCTION ? productionConfig : developmentConfig;
