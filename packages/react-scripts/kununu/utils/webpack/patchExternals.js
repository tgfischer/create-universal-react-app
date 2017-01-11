const needsCompilation = require("./needsCompilation");

function createPatchExternals(resolve) {
    function externals(context, request, callback) {
        let absoluteRequest;

        try {
            // Make it possible to require dependencies that are only installed within an app-module
            // Note: This is only for development mode.
            absoluteRequest = resolve.sync(request, { basedir: context });
        } catch(e) {
            // webpack will resolve request for us
        }

        function flagAsSourceFile() {
            callback();
        }

        function flagAsExternalFile() {
            callback(null, "commonjs " + absoluteRequest);
        }

        if (needsCompilation(absoluteRequest)) {
            flagAsSourceFile()
        } else {
            flagAsExternalFile()
        }
    }

    return function patchExternals(webpackConfig) {
        webpackConfig.externals = externals;
    };
}

module.exports = createPatchExternals;
