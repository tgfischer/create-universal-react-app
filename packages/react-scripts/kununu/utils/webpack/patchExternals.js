const resolve = require("resolve");
const needsCompliation = require("./needsCompilation");

function externals(context, request, callback) {
    let absoluteRequest;
    try {
        // prefer app-module context over integration-app context
        // this is the expected behavior while app-module developmnet
        absoluteRequest = resolve.sync(request, { basedir: context });
    } catch(e) {
        // webpack will handle that for us
    }

    if (needsCompliation(absoluteRequest) === false) {
        // This is in our node_modules, so we can safely list it as externas
        callback(null, "commonjs " + absoluteRequest);
    } else {
        // This is NOT in our node_modules, so we must bundle it.
        callback();
    }
}

function patchExternals(webpackConfig) {
    webpackConfig.externals = externals;
}

module.exports = patchExternals;
