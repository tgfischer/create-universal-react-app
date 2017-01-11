const doesContainNodeModules = /node_modules/;
const isNukleus = /node_modules\/nukleus/;
const isKununuAppModule = /-module(\/|\\)/;
const isKununuAppModuleNodeModule = /-module\/node_modules\//;

function needsCompilation(absoluteModulePath) {
    if (doesContainNodeModules.test(absoluteModulePath) === false) {
        return true;
    }

    if (isNukleus.test(absoluteModulePath)) {
        return true;
    }

    if (
        isKununuAppModule.test(absoluteModulePath) === true &&
        isKununuAppModuleNodeModule.test(absoluteModulePath) === false
    ) {
        return true;
    }

    return false;
}

module.exports = needsCompilation;
