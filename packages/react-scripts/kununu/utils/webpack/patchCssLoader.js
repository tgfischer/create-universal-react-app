const getLoaders = require("./getLoaders");
const resolveFromReactServerCli = require("./resolveFromReactServerCli");
const ExtractTextPlugin = require(resolveFromReactServerCli('extract-text-webpack-plugin'));

const expectedTestRegExp = /\.css$/;

function getCssLoaderConfig() {
    return [
        "css-loader"
    ].join("!");
}

function isCssLoader(loader) {
    return loader.test.toString() === expectedTestRegExp.toString();
}

function getCssLoader(webpackConfig) {
    const loaders = getLoaders(webpackConfig);
    const cssLoader = loaders.filter(isCssLoader)[0];
    
    if (!cssLoader) {
        throw new Error("Could not find css-loader in webpack config");
    }
    
    return cssLoader;
}

function patchCssLoader(webpackConfig, isNodeTarget) {
    const cssLoader = getCssLoader(webpackConfig);
    
    cssLoader.loader = isNodeTarget ?
        getCssLoaderConfig() :
        ExtractTextPlugin.extract(
            "style-loader",
            getCssLoaderConfig()
        );
}

exports.client = function (webpackConfig) {
    patchCssLoader(webpackConfig, false);
};

exports.server = function (webpackConfig) {
    patchCssLoader(webpackConfig, true);
};
