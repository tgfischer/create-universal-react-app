const path = require("path");

function patchResolve(webpackConfig) {
    webpackConfig.resolve = webpackConfig.resolve || {};
    
    if ("root" in webpackConfig.resolve) {
        throw new Error("Unexpected resolve option: There should be no root option because it will be overridden");
    }
    
    // Setting resolve.root ensures that webpack will pick everything from app's node_modules
    // This is necessary to prevent "Module not found" errors when linking modules
    // Check if this can be removed with webpack 2
    // @see https://github.com/webpack/webpack/issues/985
    webpackConfig.resolve.root = [
        path.resolve(process.cwd(), "node_modules")
    ];
    
    // @see react-scripts/config/webpack.config.prod.js
    webpackConfig.resolve.extensions = [".js", ".json", ".jsx", ""];
}

module.exports = patchResolve;
