const getLoaders = require("./getLoaders");
const resolveFromReactServerCli = require("./resolveFromReactServerCli");
const ExtractTextPlugin = require(resolveFromReactServerCli("extract-text-webpack-plugin"));
const pathToPostCssConfig = require.resolve("../../config/postcss.config.js");

const expectedTestRegExp = /\.s(a|c)ss$/;

function getCssModulesLoaderConfig(isNodeTarget) {
    return [
        `css-loader${ isNodeTarget ? "/locals" : "" }?` + JSON.stringify({
            modules: true,
            importLoaders: 1
        }),
        "postcss-loader?" + JSON.stringify({
            config: pathToPostCssConfig
        })
    ].join("!");
}

function isSassLoader(loader) {
    return loader.test.toString() === expectedTestRegExp.toString();
}

function getSassLoader(webpackConfig) {
    const loaders = getLoaders(webpackConfig);
    const sassLoader = loaders.filter(isSassLoader)[0];
    
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
