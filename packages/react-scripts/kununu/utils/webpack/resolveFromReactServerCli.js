const resolve = require("resolve");
const path = require("path");

function resolveFromReactServerCli(module) {
    const pathToReactServerCli = require.resolve("react-server-cli");
    
    return resolve.sync(module, {
        basedir: path.dirname(pathToReactServerCli)
    });
}

module.exports = resolveFromReactServerCli;
