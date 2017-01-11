const needsCompilation = require("../utils/webpack/needsCompilation");
const createPatchLoaders = require("../utils/webpack/patchLoaders");
const patchLoaders = createPatchLoaders(needsCompilation);
const patchResolve = require("../utils/webpack/patchResolve");
const patchBabelLoader = require("../utils/webpack/patchBabelLoader");
const patchSassLoader = require("../utils/webpack/patchSassLoader");
const disableExtractTextPlugin = require("../utils/webpack/disableExtractTextPlugin");

function webpackClientConfig(webpackConfig) {
    // This check is not really correct because we actually needed to check for the hot-option. Unfortunately, we can't access
    // these configuration values here, so let's assume that NODE_ENV = "development" roughly equals the hot-option.
    const hotIsEnabled = process.env.NODE_ENV === "development";
    // The current react-server-cli branch sets this on true which renders ugly error messages in our console
    // This can be removed when the react-server-cli branch has been fixed
    webpackConfig.profile = false;

    patchLoaders(webpackConfig);
    patchBabelLoader(webpackConfig);
    patchSassLoader.client(webpackConfig);
    patchResolve(webpackConfig);
    if (hotIsEnabled) {
        disableExtractTextPlugin(webpackConfig);
    }

    return webpackConfig;
}

module.exports = webpackClientConfig;
