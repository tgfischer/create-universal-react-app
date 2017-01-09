const patchLoaderIncludes = require("../utils/webpack/patchLoaderIncludes");
const patchResolve = require("../utils/webpack/patchResolve");
const patchBabelLoader = require("../utils/webpack/patchBabelLoader");
const patchSassLoader = require("../utils/webpack/patchSassLoader");
const patchExtractText = require("../utils/webpack/patchExtractText");

function webpackClientConfig(webpackConfig) {
    // The current react-server-cli branch sets this on true which renders ugly error messages in our console
    // This can be removed when the react-server-cli branch has been fixed
    webpackConfig.profile = false;
    
    patchLoaderIncludes(webpackConfig);
    patchBabelLoader(webpackConfig);
    patchSassLoader.client(webpackConfig);
    patchResolve(webpackConfig);
    patchExtractText(webpackConfig);
    
    return webpackConfig;
}

module.exports = webpackClientConfig;
