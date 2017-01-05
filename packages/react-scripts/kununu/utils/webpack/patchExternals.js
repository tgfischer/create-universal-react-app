// Based on react-server's implementation
const fs = require("fs");
const path = require("path");
const matchAppModules = require("./matchAppModules");

// Used with packing modules for Node
const nodeModules = {};

// Identify all node_modules for later
fs.readdirSync("node_modules")
    .filter(function(x) {
        return [".bin"].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = true;
    });

function externals(context, request, callback) {
    let absoluteRequest;
    if (/^\./.test(request)) {
        // this is a relative pathname
        absoluteRequest = path.join(context, request);
    } else {
        absoluteRequest = request;
    }
    // Make all of the requests relative to node_modules for determining nested modules
    const relativeRequest = path.normalize(absoluteRequest).replace(/^.*?\/node_modules\//, '');

    // search for a '/' indicating a nested module
    const slashIndex = relativeRequest.indexOf("/");
    let rootModuleName;
    if (slashIndex === -1) {
        rootModuleName = relativeRequest;
    } else {
        rootModuleName = relativeRequest.substr(0, slashIndex);
    }

    // Match for root modules that are in our node_modules except Webpack.
    // Because Webpack uses relative pathnames for itself, let's just bundle Webpack
    if (rootModuleName !== "webpack" && nodeModules.hasOwnProperty(rootModuleName) && matchAppModules().test(absoluteRequest) === false) {
        // This is in our node_modules, so we can safely list it as external
        callback(null, "commonjs " + request);
    } else {
        // This is NOT in our node_modules, so we must bundle it.
        callback();
    }
}

function patchExternals(webpackConfig) {
    webpackConfig.externals = externals;
}

module.exports = patchExternals;
