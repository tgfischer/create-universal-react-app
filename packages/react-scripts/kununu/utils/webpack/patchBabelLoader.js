const getLoaders = require("./getLoaders");

const reactServerPresets = require.resolve("babel-preset-react-server");

function getBabelLoader(webpackConfig) {
    const loaders = getLoaders(webpackConfig);
    const babelLoader = loaders.filter(loader => /^babel/.test(loader.loader))[0];
    
    if (!babelLoader) {
        throw new Error("Could not find babel-loader in webpack config");
    }
    
    return babelLoader;
}

function patchBabelLoader(webpackConfig) {
    const babelLoader = getBabelLoader(webpackConfig);
    
    babelLoader.query = {
          babelrc: false,
          presets: [reactServerPresets],
          cacheDirectory: true
    };
}

module.exports = patchBabelLoader;
