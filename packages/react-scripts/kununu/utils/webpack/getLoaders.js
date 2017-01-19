module.exports = function getLoaders (webpackConfig) {
  const loaders =
    webpackConfig &&
    webpackConfig.module &&
    // webpack 1 loaders
    (webpackConfig.module.loaders ||
    // webpack 2 loaders
    webpackConfig.module.rules);

  if (!Array.isArray(loaders)) {
    throw new Error('Unexpected webpack config: There is no loaders array');
  }

  return loaders;
};
