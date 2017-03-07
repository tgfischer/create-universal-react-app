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
    'css?modules&localIdentName=[name]---[local]---[hash:base64:5]' :
    ExtractTextPlugin.extract(
      'style-loader',
      'css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
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
