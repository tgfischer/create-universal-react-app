const path = require("path");
const getLoaders = require("./getLoaders");
const matchAppModules = require("./matchAppModules");

const pages = path.resolve(process.cwd(), "pages");
const components = path.resolve(process.cwd(), "components");

function patchLoaderIncludes(webpackConfig) {
    const loaders = getLoaders(webpackConfig);
    
    loaders.forEach(loader => {
        delete loader.exclude;
        if (/^json/.test(loader.loader)) {
            return;
        }
        loader.include = [
            matchAppModules(),
            pages,
            components
        ];
    });
}

module.exports = patchLoaderIncludes;
