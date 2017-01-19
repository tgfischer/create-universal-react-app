/* eslint no-param-reassign: ['error', {props: false}] */
// For now we still reassign properties imperatively because we haven't found a simpler, more declarative way of changing the webpack config.
// Ref: https://github.com/kununu/create-universal-react-app/blob/react-server-integration/packages/react-scripts/kununu/config/webpack.client.config.js#L33-L34
const resolve = require('resolve');

const needsCompilation = require('./needsCompilation');

module.exports = function patchExternals (webpackConfig) {
  webpackConfig.externals = (context, request, callback) => {
    let absoluteRequest;

    try {
      // Make it possible to require dependencies that are only installed within an app-module
      // Note: This is only for development mode.
      absoluteRequest = resolve.sync(request, {basedir: context});
    } catch (e) {
      // webpack will resolve request for us
    }

    if (needsCompilation(absoluteRequest)) {
      // Flag as source file
      callback();
    } else {
      // Flag as external file
      callback(null, `commonjs ${absoluteRequest}`);
    }
  };
};
