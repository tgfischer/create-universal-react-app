module.exports = function patchESLintLoader (webpackConfig) {
  webpackConfig.module.preLoaders = webpackConfig.module.preloaders || [];
  webpackConfig.module.preLoaders.push({
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
  });

  webpackConfig.eslint = {
    failOnError: false,
    failOnWarning: false,
    fix: false,
    emitWarning: true,
  };
};
