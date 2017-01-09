const webpackServerConfig = require("@kununu/react-universal-scripts/kununu/config/webpack.server.config.js");

module.exports = {
    default(webpackConfig) {
        webpackServerConfig(webpackConfig);

        return webpackConfig;
    }
};
