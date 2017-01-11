const getLoaders = require("./getLoaders");
const resolveFromReactServerCli = require("./resolveFromReactServerCli");
const ExtractTextPlugin = require(resolveFromReactServerCli("extract-text-webpack-plugin"));

function disableExtractText(webpackConfig) {
    const plugins = webpackConfig.plugins;
    
    if (Array.isArray(plugins) === false) {
        throw new Error("Could not find plugins array in webpack config");
    }
    
    const extractTextPlugin = plugins.find(plugin => plugin instanceof ExtractTextPlugin);
    
    if (!extractTextPlugin) {
        throw new Error("Could not find ExtractTextWebpackPlugin in webpack config");
    }
    
    extractTextPlugin.options.disable = true;
}

module.exports = disableExtractText;
