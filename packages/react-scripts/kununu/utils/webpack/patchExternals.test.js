const path = require('path');

const patchExternals = require('./patchExternals');

describe('app-module development | app module is linked by npm in integration app', () => {
  describe('app-module', () => {
    test('flags app-module as source', () => {
      const webpackConfig = {};
      const context = path.join(__dirname, '../../fixtures/patchExternals');
      const request = '@kununu/kununu-app-module';
      const callbackSpy = jest.fn();

      patchExternals(webpackConfig);
      webpackConfig.externals(context, request, callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith();
    });
  });

  describe('module is only installed inside app module', () => {
    test('flags module as external', () => {
      const webpackConfig = {};
      const context = path.join(__dirname, '../../fixtures/patchExternals');
      const request = 'react-intl';
      const absoluteRequest = `${context}/node_modules/${request}/index.js`;
      const callbackSpy = jest.fn();

      patchExternals(webpackConfig);
      webpackConfig.externals(context, request, callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith(null, `commonjs ${absoluteRequest}`);
    });
  });

  describe('module is only installed inside integration app', () => {
    test('flags module as external', () => {
      const webpackConfig = {};
      const context = path.join(__dirname, '../../fixtures/patchExternals');
      const request = 'react';
      const absoluteRequest = `${context}/node_modules/${request}/index.js`;
      const callbackSpy = jest.fn();

      patchExternals(webpackConfig);
      webpackConfig.externals(context, request, callbackSpy);

      expect(callbackSpy).toHaveBeenCalledWith(null, `commonjs ${absoluteRequest}`);
    });
  });
});

describe('nukleus', () => {
  test('flags nukleus components as source', () => {
    const webpackConfig = {};
    const context = path.join(__dirname, '../../fixtures/patchExternals');
    const request = 'nukleus';
    const callbackSpy = jest.fn();

    patchExternals(webpackConfig);
    webpackConfig.externals(context, request, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledWith();
  });

  test('flags nukleus styles as source', () => {
    const webpackConfig = {};
    const context = path.join(__dirname, '../../fixtures/patchExternals');
    const request = 'nukleus/dist/main.css';
    const callbackSpy = jest.fn();

    patchExternals(webpackConfig);
    webpackConfig.externals(context, request, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledWith();
  });
});

describe('babel', () => {
  test('flags babel as external', () => {
    const webpackConfig = {};
    const context = path.join(__dirname, '../../fixtures/patchExternals');
    const request = 'babel-runtime/helpers/classCallCheck';
    const absoluteRequest = `${context}/node_modules/${request}.js`;
    const callbackSpy = jest.fn();

    patchExternals(webpackConfig);
    webpackConfig.externals(context, request, callbackSpy);

    expect(callbackSpy).toHaveBeenCalledWith(null, `commonjs ${absoluteRequest}`);
  });
});
