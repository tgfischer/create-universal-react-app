const webpackClientConfig = require("@kununu/react-universal-scripts/kununu/config/webpack.client.config.js");

module.exports = {
    default(webpackConfig) {
        webpackClientConfig(webpackConfig);

        return webpackConfig;
    }
};
