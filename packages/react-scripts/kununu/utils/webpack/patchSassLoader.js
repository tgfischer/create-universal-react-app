const getLoaders = require("./getLoaders");
// Since the webpack.config is created by react-server-cli, we need to use their extract-text-webpack-plugin
const ExtractTextPlugin = require("react-server-cli/node_modules/extract-text-webpack-plugin");

function getCssModulesLoaderConfig(isNodeTarget) {
    return [
        `css-loader${ isNodeTarget ? "/locals" : "" }?` + JSON.stringify({
            modules: true,
            importLoaders: 1
        }),
        "postcss-loader",
        "sass-loader"
    ].join("!");
}

function getSassLoader(webpackConfig) {
    const loaders = getLoaders(webpackConfig);
    const sassLoader = loaders.filter(loader => /sass-loader$/.test(loader.loader))[0];
    
    if (!sassLoader) {
        throw new Error("Could not find sass-loader in webpack config");
    }
    
    return sassLoader;
}

function patchSassLoader(webpackConfig, isNodeTarget) {
    const sassLoader = getSassLoader(webpackConfig);
    
    sassLoader.loader = isNodeTarget ?
        getCssModulesLoaderConfig(isNodeTarget) :
        ExtractTextPlugin.extract(
            "style-loader",
            getCssModulesLoaderConfig(isNodeTarget)
        );
}

exports.client = function (webpackConfig) {
    patchSassLoader(webpackConfig, false);
};

exports.server = function (webpackConfig) {
    patchSassLoader(webpackConfig, true);
};
