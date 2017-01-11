// Note 1:
// node supports Intl but it includes only English locale data.
// However we need to support more than only English.
// Compiling a custom binary isn't an option.
// Checkout http://formatjs.io/guides/runtime-environments/#intl-polyfill from formatjs docs.
//
// Note 2:
// react-server does not provide any good place for setting up this polyfill.
// So this is the only option to do that.
global.Intl = require("intl");

const resolve = require("resolve");
const createPatchExternals = require("../utils/webpack/patchExternals");
const patchExternals = createPatchExternals(resolve);
const needsCompliation = require("../utils/webpack/needsCompilation");
const createPatchLoaders = require("../utils/webpack/patchLoaders");
const patchLoaders = createPatchLoaders(needsCompliation);
const patchResolve = require("../utils/webpack/patchResolve");
const patchBabelLoader = require("../utils/webpack/patchBabelLoader");
const patchSassLoader = require("../utils/webpack/patchSassLoader");
const disableExtractTextPlugin = require("../utils/webpack/disableExtractTextPlugin");
const removeCssNoopPlugin = require("../utils/webpack/removeCssNoopPlugin");

function webpackServerConfig(webpackConfig) {
    // The current react-server-cli branch sets this on true which renders ugly error messages in our console
    // This can be removed when the react-server-cli branch has been fixed
    webpackConfig.profile = false;

    patchExternals(webpackConfig, needsCompliation);
    patchLoaders(webpackConfig);
    patchBabelLoader(webpackConfig);
    patchSassLoader.server(webpackConfig);
    patchResolve(webpackConfig);
    disableExtractTextPlugin(webpackConfig);
    removeCssNoopPlugin(webpackConfig);

    return webpackConfig;
}

module.exports = webpackServerConfig;
