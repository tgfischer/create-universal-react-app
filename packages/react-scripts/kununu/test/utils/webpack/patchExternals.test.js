const createPatchExternals = require("../../../utils/webpack/patchExternals");

test("uses resolve", () => {
    const webpackConfig = {};
    const context = "/Users/$USER/Workspace/kununu-integration-app";
    const request = "@kununu/kununu-app-module"
    const callback = () => {};
    const resolveMock = {
        sync: jest.fn()
    };
    const patchExternals = createPatchExternals(resolveMock);

    patchExternals(webpackConfig);
    webpackConfig.externals(context, request, callback);

    expect(resolveMock.sync).toHaveBeenCalledWith(request, { basedir: context });
});

describe("app-module development | app module is linked by npm in integration app", () => {
    describe("app-module", () => {
        test("flags app-module as source", () => {
            const webpackConfig = {};
            const context = "/Users/$USER/Workspace/kununu-integration-app/";
            const request = "node_modules/@kununu/kununu-app-module";
            const absoluteRequest = "/Users/$USER/Workspace/kununu-integration-app/node_modules/@kununu/kununu-app-module";
            const callbackSpy = jest.fn();
            const resolve = {
                sync() {
                    return absoluteRequest;
                }
            }
            const patchExternals = createPatchExternals(resolve);

            patchExternals(webpackConfig);
            webpackConfig.externals(context, request, callbackSpy);

            expect(callbackSpy).toHaveBeenCalledWith(null, "commonjs " + absoluteRequest);
        });
    });

    describe("module is only installed inside app module", () => {
        test("flags module as external", () => {
            const webpackConfig = {};
            const context = "/Users/$USER/Workspace/kununu-app-module/pages";
            const request = "react-intl";
            const absoluteRequest = "/Users/$USER/Workspace/kununu-app-module/node_modules/react-intl";
            const callbackSpy = jest.fn();
            const resolve = {
                sync() {
                    return absoluteRequest;
                }
            }
            const patchExternals = createPatchExternals(resolve);

            patchExternals(webpackConfig);
            webpackConfig.externals(context, request, callbackSpy);

            expect(callbackSpy).toHaveBeenCalledWith(null, "commonjs " + absoluteRequest);
        });
    });

    describe("module is only installed inside integration app", () => {
        test("flags module as external", () => {
            const webpackConfig = {};
            const context = "/Users/$USER/Workspace/kununu-app-module/components";
            const request = "react";
            const absoluteRequest = "/Users/$USER/Workspace/kununu-integration-app/node_modules/react";
            const callbackSpy = jest.fn();
            const resolve = {
                sync() {
                    return absoluteRequest;
                }
            }
            const patchExternals = createPatchExternals(resolve);

            patchExternals(webpackConfig);
            webpackConfig.externals(context, request, callbackSpy);

            expect(callbackSpy).toHaveBeenCalledWith(null, "commonjs " + absoluteRequest);
        });
    });
});

describe("nukleus", () => {
    test("flags nukleus components as source", () => {
        const webpackConfig = {};
        const context = "/Users/$USER/Workspace/kununu-app-module/components";
        const request = "nukleus";
        const absoluteRequest = "/Users/$USER/Workspace/kununu-integration-app/node_modules/nukleus";
        const callbackSpy = jest.fn();
        const resolve = {
            sync() {
                return absoluteRequest;
            }
        }
        const patchExternals = createPatchExternals(resolve);

        patchExternals(webpackConfig);
        webpackConfig.externals(context, request, callbackSpy);

        expect(callbackSpy).toHaveBeenCalledWith();
    });

    test("flags nukleus styles as source", () => {
        const webpackConfig = {};
        const context = "/Users/$USER/Workspace/kununu-app-module/components";
        const request = "nukleus/dist/main.css";
        const absoluteRequest = "/Users/$USER/Workspace/kununu-integration-app/node_modules/nukleus/dist/main.css";
        const callbackSpy = jest.fn();
        const resolve = {
            sync() {
                return absoluteRequest;
            }
        }
        const patchExternals = createPatchExternals(resolve);

        patchExternals(webpackConfig);
        webpackConfig.externals(context, request, callbackSpy);

        expect(callbackSpy).toHaveBeenCalledWith();
    });
});

describe("babel", () => {
    test("flags babel as external", () => {
        const webpackConfig = {};
        const context = "/Users/$USER/Workspace/kununu-app-module/pages";
        const request = "babel-runtime/helpers/classCallCheck";
        const absoluteRequest = "/Users/$USER/Workspace/kununu-integration-app/node_modules/babel-runtime/helpers/classCallCheck";
        const callbackSpy = jest.fn();
        const resolve = {
            sync() {
                return absoluteRequest;
            }
        }
        const patchExternals = createPatchExternals(resolve);

        patchExternals(webpackConfig);
        webpackConfig.externals(context, request, callbackSpy);

        expect(callbackSpy).toHaveBeenCalledWith(null, "commonjs " + absoluteRequest);
    });
});
