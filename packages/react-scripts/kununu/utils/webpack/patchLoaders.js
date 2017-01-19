/* eslint no-param-reassign: ['error', {props: false}] */
// For now we still reassign properties imperatively because we haven't found a simpler, more declarative way of changing the webpack config.
// Ref: https://github.com/kununu/create-universal-react-app/blob/react-server-integration/packages/react-scripts/kununu/config/webpack.client.config.js#L33-L34
const getLoaders = require('./getLoaders');
const needsCompilation = require('./needsCompilation');

module.exports = function patchLoaders (webpackConfig) {
  const loaders = getLoaders(webpackConfig);

  loaders.forEach((loader) => {
    delete loader.exclude;
    delete loader.include;

    if (/^json/.test(loader.loader)) return;

    if (loader.test instanceof RegExp === false) {
      throw new Error('Unexpected webpack config: loader\'s test is not a RegExp');
    }

    const originalTestPattern = loader.test;

    loader.test = function shouldBeHandledByLoader (absoluteModulePath) {
      if (originalTestPattern.test(absoluteModulePath) === false) return false;
      return needsCompilation(absoluteModulePath);
    };
  });
};
