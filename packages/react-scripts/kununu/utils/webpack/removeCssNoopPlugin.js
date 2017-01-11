const getLoaders = require("./getLoaders");

const expectedResourceRegExp = /\.(css|less|sass|scss)$/;

/**
 * Our current react-server-cli which is based on branch https://github.com/redfin/react-server/pull/791
 * adds a NormalModuleReplacementPlugin to remove all CSS modules from the server build. However, in order to make
 * CSS modules work we need to remove that plugin.
 *
 * This module can be removed as soon the react-server-cli branch is not adding this particular plugin.
 *
 * @param webpackConfig
 */
function removeCssNoopPlugin(webpackConfig) {
    const plugins = webpackConfig.plugins;
    
    if (Array.isArray(plugins) === false) {
        throw new Error("Could not find plugins array in webpack config");
    }
    
    webpackConfig.plugins = webpackConfig.plugins.filter(isNotCssNoopPlugin);
}

function isNotCssNoopPlugin(plugin) {
    const isAnotherPlugin = "resourceRegExp" in plugin === false;
    
    return isAnotherPlugin || hasADifferentResourceRegExp(plugin);
}

function hasADifferentResourceRegExp(plugin) {
    return plugin.resourceRegExp.toString() !== expectedResourceRegExp.toString();
}

module.exports = removeCssNoopPlugin;
