const webpackServerConfig = require('@kununu/react-universal-scripts/kununu/config/webpack.server.config.js');

module.exports = {
  default (webpackConfig) {
    return webpackServerConfig(webpackConfig);
  },
};
