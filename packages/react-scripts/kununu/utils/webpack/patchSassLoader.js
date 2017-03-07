const getLoaders = require('./getLoaders');
const resolveFromReactServerCli = require('./resolveFromReactServerCli');

const ExtractTextPlugin = require(resolveFromReactServerCli('extract-text-webpack-plugin')); // eslint-disable-line import/no-dynamic-require
const pathToPostCssConfig = require.resolve('../../config/postcss.config.js');

function getCssModulesLoaderConfig (isNodeTarget) {
  return [
    `css-loader${isNodeTarget ? '/locals' : ''}?${JSON.stringify({
      modules: false,
      importLoaders: 1,
    })}`,
    `postcss-loader?${JSON.stringify({
      config: pathToPostCssConfig,
    })}`,
    'sass-loader',
  ].join('!');
}

function patchSassLoader ({webpackConfig, isNodeTarget}) {
  const sassLoader = getLoaders(webpackConfig)
    .find((loader) => String(loader.test) === String(/\.s(a|c)ss$/));

  if (!sassLoader) {
    throw new Error('Could not find sass-loader in webpack config');
  }

  sassLoader.loader = isNodeTarget ?
    getCssModulesLoaderConfig(isNodeTarget) :
    ExtractTextPlugin.extract(
      'style-loader',
      getCssModulesLoaderConfig(isNodeTarget)
    );
}

module.exports = {
  client (webpackConfig) {
    patchSassLoader({webpackConfig, isNodeTarget: false});
  },
  server (webpackConfig) {
    patchSassLoader({webpackConfig, isNodeTarget: true});
  },
};
