/* eslint no-param-reassign: ['error', {props: false}] */
// For now we still reassign properties imperatively because we haven't found a simpler, more declarative way of changing the webpack config.
// Ref: https://github.com/kununu/create-universal-react-app/blob/react-server-integration/packages/react-scripts/kununu/config/webpack.client.config.js#L33-L34
const patchLoaders = require('../utils/webpack/patchLoaders');
const patchResolve = require('../utils/webpack/patchResolve');
const patchBabelLoader = require('../utils/webpack/patchBabelLoader');
const patchSassLoader = require('../utils/webpack/patchSassLoader');
const patchCssLoader = require('../utils/webpack/patchCssLoader');
const patchESLintLoader = require('../utils/webpack/patchESLintLoader');
const disableExtractTextPlugin = require('../utils/webpack/disableExtractTextPlugin');

module.exports = function webpackClientConfig (webpackConfig) {
  // This check is not really correct because we actually needed to check for the hot-option. Unfortunately, we can't access
  // these configuration values here, so let's assume that NODE_ENV = "development" roughly equals the hot-option.
  const hotIsEnabled = process.env.NODE_ENV === 'development';
  // The current react-server-cli branch sets this on true which renders ugly error messages in our console
  // This can be removed when the react-server-cli branch has been fixed
  webpackConfig.profile = false;

  // TODO: These patch functions are black boxes and mutate the complex object argument passed to it. Make the contract for them clearer.
  // At the very least, each function should only accept and modify the minimum viable piece of the webpack config.
  // A more advanced suggestion is below (changing the webpack config declaratively via object spread operators)
  patchCssLoader.client(webpackConfig);
  patchSassLoader.client(webpackConfig);
  patchBabelLoader(webpackConfig);
  patchLoaders(webpackConfig);
  patchResolve(webpackConfig);

  if (hotIsEnabled) {
    disableExtractTextPlugin(webpackConfig);
    patchESLintLoader(webpackConfig);
  }

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
