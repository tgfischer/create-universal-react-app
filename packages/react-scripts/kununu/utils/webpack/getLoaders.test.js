const getLoaders = require('./getLoaders');

describe('webpack 1.x', () => {
  test('throws an error if webpackConfig does not provide a loaders config', () => {
    const falsyWebpackConfigA = {};
    const falsyWebpackConfigB = {
      module: {
        loader: [],
      },
    };
    const falsyWebpackConfigC = {
      module: {
        loaders: {},
      },
    };

    expect(() => getLoaders(falsyWebpackConfigA)).toThrow();
    expect(() => getLoaders(falsyWebpackConfigB)).toThrow();
    expect(() => getLoaders(falsyWebpackConfigC)).toThrow();
  });

  test('returns loaders array', () => {
    const webpackConfig = {
      module: {
        loaders: [],
      },
    };

    expect(getLoaders(webpackConfig)).toBe(webpackConfig.module.loaders);
  });
});

describe('webpack 2.x', () => {
  test('throws an error if webpackConfig does not provide a rules config', () => {
    const falsyWebpackConfigA = {};
    const falsyWebpackConfigB = {
      module: {
        rules: {},
      },
    };

    expect(() => getLoaders(falsyWebpackConfigA)).toThrow();
    expect(() => getLoaders(falsyWebpackConfigB)).toThrow();
  });

  test('returns loaders array', () => {
    const webpackConfig = {
      module: {
        rules: [],
      },
    };

    expect(getLoaders(webpackConfig)).toBe(webpackConfig.module.rules);
  });
});
