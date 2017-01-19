const patchLoaders = require('./patchLoaders');

test('throws an error if there is no loaders configuration present in webpack config', () => {
  const falsyWebpackConfigA = {
    module: {},
  };
  const falsyWebpackConfigB = {
    module: {
      loader: [],
    },
  };

  expect(() => patchLoaders(falsyWebpackConfigA)).toThrow();
  expect(() => patchLoaders(falsyWebpackConfigB)).toThrow();
});

test('throws an error if original loader.test is not a RegExp', () => {
  const falsyWebpackConfigA = {
    module: {
      loaders: [{
        test: [/\.jsx?$/, /\.sass?$/],
      }],
    },
  };
  const falsyWebpackConfigB = {
    module: {
      loaders: [{
        test: '\\.jsx?$',
      }],
    },
  };

  expect(() => patchLoaders(falsyWebpackConfigA)).toThrow(/RegExp/);
  expect(() => patchLoaders(falsyWebpackConfigB)).toThrow(/RegExp/);
});

test('removes exclude option from each loader', () => {
  const loaderA = {
    test: /\.a/,
    loader: 'a',
    exclude: /node_modules/,
    include: /src/,
  };
  const loaderB = {
    test: /\.b/,
    loader: 'b',
    exclude: /node_modules/,
  };
  const webpackConfig = {
    module: {
      loaders: [
        loaderA,
        loaderB,
      ],
    },
  };

  patchLoaders(webpackConfig);

  expect(loaderA.exclude).toBeUndefined();
  expect(loaderB.exclude).toBeUndefined();
});

test('removes include option from each loader', () => {
  const loaderA = {
    test: /\.a/,
    loader: 'a',
    exclude: /node_modules/,
    include: /src/,
  };
  const loaderC = {
    test: /\.c/,
    loader: 'c',
    include: /src/,
  };
  const webpackConfig = {
    module: {
      loaders: [
        loaderA,
        loaderC,
      ],
    },
  };

  patchLoaders(webpackConfig);

  expect(loaderA.include).toBeUndefined();
  expect(loaderC.include).toBeUndefined();
});

test('does not modify json-loader options (except include & exclude)', () => {
  const jsonLoader = {
    test: /\.json/,
    loader: 'json',
  };
  const webpackConfig = {
    module: {
      loaders: [
        jsonLoader,
      ],
    },
  };

  patchLoaders(webpackConfig);

  expect(jsonLoader).toEqual({test: /\.json/, loader: 'json'});
});

test('adds a test function for each loader', () => {
  const loaderA = {
    test: /\.a/,
    loader: 'a',
    exclude: /node_modules/,
    include: /src/,
  };
  const loaderB = {
    test: /\.b/,
    loader: 'b',
    exclude: /node_modules/,
  };
  const webpackConfig = {
    module: {
      loaders: [
        loaderA,
        loaderB,
      ],
    },
  };

  patchLoaders(webpackConfig);

  expect(typeof loaderA.test).toBe('function');
  expect(typeof loaderB.test).toBe('function');
});

test('test returns false if original test does not match', () => {
  const babelLoader = {
    loader: 'babel',
    test: /\.jsx?$/,
  };
  const cssLoader = {
    loader: 'sass',
    test: /\.css?$/,
  };
  const webpackConfig = {
    module: {
      loaders: [
        babelLoader,
        cssLoader,
      ],
    },
  };
  const absolutePathToNukleusInIntegrationAppCss = '/Users/$USER/workspace/integration-app/node_modules/nukleus/dist/main.css';
  const absolutePathToNukleuesInAppModule = '/Users/$USER/workspace/integration-app/node_modules/@kununu/app-module/node_modules/nukleus/dist/index.js';

  patchLoaders(webpackConfig);

  expect(babelLoader.test(absolutePathToNukleusInIntegrationAppCss)).toBe(false);
  expect(cssLoader.test(absolutePathToNukleuesInAppModule)).toBe(false);
});

test('loader tests return correct values for examples', () => {
  const babelLoader = {
    loader: 'babel',
    test: /\.jsx?$/,
  };
  const webpackConfig = {
    module: {
      loaders: [
        babelLoader,
      ],
    },
  };

  patchLoaders(webpackConfig);

  // Don't compile random node_modules (we expect them to be precompiled)
  expect(babelLoader.test('node_modules/precompiled_node_module_3uf7haq/module.js')).toBe(false);

  // Compile nukleus (we export ES modules + syntax)
  expect(babelLoader.test('node_modules/nukleus/module.js')).toBe(true);
});
