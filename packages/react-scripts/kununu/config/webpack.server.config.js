const path = require("path");
const externals = require("../utils/webpack/externals");

module.exports = {
    default: function (webpackConfig) {
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
        
        webpackConfig.externals = externals;
        
        if (/^babel/.test(babelLoader.loader) === false) {
            throw new Error("babel-loader not found in webpack.config");
        }
        babelLoader.query = {
            "presets": ["react-server"]
        };
        
        //console.log("server config", webpackConfig);

        return webpackConfig;
    }
};
