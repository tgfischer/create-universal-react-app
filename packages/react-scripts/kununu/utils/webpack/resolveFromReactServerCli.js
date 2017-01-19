const path = require('path');

const resolve = require('resolve');

/**
 * This helper function is necessary because we need to resolve some dependencies from the perspective of
 * react-server-cli in order to do instanceof and === checks on the webpack config.
 *
 * @param {string} module
 * @returns {string}
 */
function resolveFromReactServerCli (module) {
  const pathToReactServerCli = require.resolve('react-server-cli');

  return resolve.sync(module, {
    basedir: path.dirname(pathToReactServerCli),
  });
}

module.exports = resolveFromReactServerCli;
