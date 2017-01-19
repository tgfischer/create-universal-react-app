const getLoaders = require('./getLoaders');

module.exports = function patchBabelLoader (webpackConfig) {
  const babelLoader = getLoaders(webpackConfig)
    .find((loader) => /^babel/.test(loader.loader));

  if (!babelLoader) {
    throw new Error('Could not find babel-loader in webpack config');
  }

  babelLoader.query = {
    babelrc: false,
    presets: [require.resolve('babel-preset-react-server')],
    // This is a feature of `babel-loader` for webpack (not Babel itself).
    // It enables caching results in ./node_modules/.cache/babel-loader/
    // directory for faster rebuilds.
    cacheDirectory: true,
  };
};
