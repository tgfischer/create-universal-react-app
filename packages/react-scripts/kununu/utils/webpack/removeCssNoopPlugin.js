/* eslint no-param-reassign: ['error', {props: false}] */
// For now we still reassign properties imperatively because we haven't found a simpler, more declarative way of changing the webpack config.
// Ref: https://github.com/kununu/create-universal-react-app/blob/react-server-integration/packages/react-scripts/kununu/config/webpack.client.config.js#L33-L34

/**
 * Our current react-server-cli which is based on branch https://github.com/redfin/react-server/pull/791
 * adds a NormalModuleReplacementPlugin to remove all CSS modules from the server build. However, in order to make
 * CSS modules work we need to remove that plugin.
 *
 * This module can be removed as soon the react-server-cli branch is not adding this particular plugin.
 *
 * @param webpackConfig
 */
module.exports = function removeCssNoopPlugin (webpackConfig) {
  const plugins = webpackConfig.plugins;

  if (Array.isArray(plugins) === false) {
    throw new Error('Could not find plugins array in webpack config');
  }

  // Filter out CSS noop plugin (NormalModuleReplacementPlugin)
  webpackConfig.plugins = webpackConfig.plugins
    .filter((plugin) => (
      // NormalModuleReplacementPlugin has a `resourceRegExp` property...
      'resourceRegExp' in plugin === false ||
      // ...configured with this regular expression
      String(plugin.resourceRegExp) !== String(/\.(css|less|sass|scss)$/)
    ));
};
