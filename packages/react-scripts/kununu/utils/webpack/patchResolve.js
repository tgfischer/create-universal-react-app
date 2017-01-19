/* eslint no-param-reassign: ['error', {props: false}] */
// For now we still reassign properties imperatively because we haven't found a simpler, more declarative way of changing the webpack config.
// Ref: https://github.com/kununu/create-universal-react-app/blob/react-server-integration/packages/react-scripts/kununu/config/webpack.client.config.js#L33-L34
const path = require('path');

module.exports = function patchResolve (webpackConfig) {
  webpackConfig.resolve = webpackConfig.resolve || {};

  if ('root' in webpackConfig.resolve) {
    throw new Error('Unexpected resolve option: There should be no root option because it will be overridden');
  }

  // Setting resolve.root ensures that webpack will pick everything from app's node_modules
  // This is necessary to prevent "Module not found" errors when linking modules
  // TODO: Check if this can be removed with webpack 2
  // https://github.com/webpack/webpack/issues/985
  webpackConfig.resolve.root = [
    path.resolve(process.cwd(), 'node_modules'),
  ];

  // Copied from react-scripts in the base create-react-app
  // https://github.com/facebookincubator/create-react-app/blob/f4c3f8b6d8788d1214cc2221ed010623f83255e7/packages/react-scripts/config/webpack.config.prod.js#L93-L97
  webpackConfig.resolve.extensions = ['.js', '.json', '.jsx', ''];
};
