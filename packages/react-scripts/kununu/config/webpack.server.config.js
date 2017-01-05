const patchExternals = require("../utils/webpack/patchExternals");
const patchLoaderIncludes = require("../utils/webpack/patchLoaderIncludes");
const patchResolve = require("../utils/webpack/patchResolve");
const patchBabelLoader = require("../utils/webpack/patchBabelLoader");

function webpackServerConfig(webpackConfig) {
    
    patchExternals(webpackConfig);
    patchLoaderIncludes(webpackConfig);
    patchBabelLoader(webpackConfig);
    patchResolve(webpackConfig);
    
    return webpackConfig;
}

module.exports = webpackServerConfig;
