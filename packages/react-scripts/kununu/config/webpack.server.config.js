/* eslint no-param-reassign: ['error', {props: false}] */
// For now we still reassign properties imperatively because we haven't found a simpler, more declarative way of changing the webpack config.
// Ref: https://github.com/kununu/create-universal-react-app/blob/react-server-integration/packages/react-scripts/kununu/config/webpack.client.config.js#L33-L34

// node supports Intl but it includes only English locale data (but we need to support more than only English).
// The formatjs polyfill docs: http://formatjs.io/guides/runtime-environments/#intl-polyfill
// react-server does not offer a good place for setting up this polyfill, so this is where we do it.
global.Intl = require('intl');

const patchExternals = require('../utils/webpack/patchExternals');
const patchLoaders = require('../utils/webpack/patchLoaders');
const patchResolve = require('../utils/webpack/patchResolve');
const patchBabelLoader = require('../utils/webpack/patchBabelLoader');
const patchSassLoader = require('../utils/webpack/patchSassLoader');
const patchCssLoader = require('../utils/webpack/patchCssLoader');
const disableExtractTextPlugin = require('../utils/webpack/disableExtractTextPlugin');
const removeCssNoopPlugin = require('../utils/webpack/removeCssNoopPlugin');

module.exports = function webpackServerConfig (webpackConfig) {
    // The current react-server-cli branch sets this on true which renders ugly error messages in our console
    // This can be removed when the react-server-cli branch has been fixed
  webpackConfig.profile = false;

  // TODO: These patch functions are black boxes and mutate the complex object argument passed to it. Make the contract for them clearer.
  // At the very least, each function should only accept and modify the minimum viable piece of the webpack config.
  // A more advanced suggestion is below (changing the webpack config declaratively via object spread operators)
  patchCssLoader.server(webpackConfig);
  patchSassLoader.server(webpackConfig);
  patchBabelLoader(webpackConfig);
  patchLoaders(webpackConfig);
  patchExternals(webpackConfig);
  patchResolve(webpackConfig);
  disableExtractTextPlugin(webpackConfig);
  removeCssNoopPlugin(webpackConfig);

  return webpackConfig;


  // TODO: Refactor all imperative, mutative code above
  // If we had object spread, we can write the webpack config much more declaratively:
  //
  // return {
  //   ...webpackConfig,
  //   profile: false,
  //   module: {
  //     ...webpackConfig.module,
  //     loaders: [
  //       // All loaders except the ones we want to change
  //       ...webpackConfig.module.loaders.filter((loader) =>
  //         String(loader.test) !== String(/\.css$/) &&
  //         String(loader.test) !== String(/\.sass$/) &&
  //         String(loader.test) !== String(/\.js$/),
  //       ),
  //       // Patch CSS Loader (2 lines instead of separate 30-line file!)
  //       webpackConfig.module.loaders
  //         .find((loader) => String(loader.test) === String(/\.css$/))
  //         .map((loader) => ({...loader, loader: 'css-loader'})),
  //       // Etc...
  //     ],
  //   },
  // };
  //
  // To get object spread we'll have to compile the config because currently
  // Rest / Spread Properties is only Stage 3.
};
