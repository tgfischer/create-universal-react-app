const getLoaders = require("./getLoaders");

function createPatchLoaders(needsCompilation) {
    function createShouldBeHandledByLoader(originalTestPattern) {
        if (originalTestPattern instanceof RegExp === false) {
            throw new Error("Unexpected webpack config: loader's test is not a RegExp");
        }

        return function shouldBeHandledByLoader(absoluteModulePath) {
            if (originalTestPattern.test(absoluteModulePath) === false) {
                return false;
            }

            return needsCompilation(absoluteModulePath);
        }
    }

    function patchLoaders(webpackConfig) {
        const loaders = getLoaders(webpackConfig);

        loaders.forEach(loader => {
            delete loader.exclude;
            delete loader.include;

            if (/^json/.test(loader.loader)) {
                return;
            }

            loader.test = createShouldBeHandledByLoader(loader.test);
        });
    }

    return patchLoaders;
}

module.exports = createPatchLoaders;
