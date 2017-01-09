const getLoaders = require("./getLoaders");
// Since the webpack.config is created by react-server-cli, we need to use their extract-text-webpack-plugin
const ExtractTextPlugin = require("react-server-cli/node_modules/extract-text-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

function patchExtractText(webpackConfig) {
    const plugins = webpackConfig.plugins;
    
    if (Array.isArray(plugins) === false) {
        throw new Error("Could not find plugins array in webpack config");
    }
    
    const extractTextPlugin = plugins.find(plugin => plugin instanceof ExtractTextPlugin);
    
    if (!extractTextPlugin) {
        throw new Error("Could not find ExtractTextWebpackPlugin in webpack config");
    }
    
    extractTextPlugin.options.disable = isDev;
}

module.exports = patchExtractText;
