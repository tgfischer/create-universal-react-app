const getLoaders = require('./getLoaders');
const resolveFromReactServerCli = require('./resolveFromReactServerCli');

const ExtractTextPlugin = require(resolveFromReactServerCli('extract-text-webpack-plugin')); // eslint-disable-line import/no-dynamic-require

function patchCssLoader ({webpackConfig, isNodeTarget}) {
  const cssLoader = getLoaders(webpackConfig)
    .find((loader) => String(loader.test) === String(/\.css$/));

  if (!cssLoader) {
    throw new Error('Could not find css-loader in webpack config');
  }

  cssLoader.loader = isNodeTarget ?
    'css-loader' :
    ExtractTextPlugin.extract(
      'style-loader',
      'css-loader'
    );
}

module.exports = {
  client (webpackConfig) {
    patchCssLoader({webpackConfig, isNodeTarget: false});
  },
  server (webpackConfig) {
    patchCssLoader({webpackConfig, isNodeTarget: true});
  },
};
