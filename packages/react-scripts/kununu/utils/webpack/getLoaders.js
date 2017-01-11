function getLoaders(webpackConfig) {
    const loaders = webpackConfig && webpackConfig.module && webpackConfig.module.loaders;

    if (!loaders) {
        throw new Error("Unexpected webpack config: There is no loaders array");
    }

    return loaders;
}

module.exports = getLoaders;
