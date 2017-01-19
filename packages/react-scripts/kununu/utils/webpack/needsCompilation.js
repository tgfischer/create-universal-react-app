module.exports = function needsCompilation (absoluteModulePath) {
  return (
    // Don't compile node modules
    /node_modules/.test(absoluteModulePath) === false ||

    // Do compile nukleus
    /node_modules\/nukleus/.test(absoluteModulePath) ||

    (
      // Do compile modules...
      /-module(\/|\\)/.test(absoluteModulePath) === true &&

      // ...but not their respective node modules.
      /-module\/node_modules\//.test(absoluteModulePath) === false
    )
  );
};
