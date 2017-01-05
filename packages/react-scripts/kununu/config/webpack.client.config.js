const path = require("path");

function webpackClientConfig(webpackConfig) {
    const babelLoader = webpackConfig.module.loaders[0];
    
    webpackConfig.module.loaders.forEach(loader => {
        delete loader.exclude;
        if (/^json/.test(loader.loader)) {
            return;
        }
        loader.include = [
            path.dirname(require.resolve("@kununu/example-review-module"))
        ];
    });
    
    if (/^babel/.test(babelLoader.loader) === false) {
        throw new Error("babel-loader not found in webpack.config");
    }
    babelLoader.query = {
        "presets": ["react-server"]
    };
    
    return webpackConfig;
}

module.exports = webpackClientConfig;
