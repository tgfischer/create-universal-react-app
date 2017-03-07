module.exports = function needsCompilation (absoluteModulePath) {
  return (
    // Don't compile node modules
    /node_modules/.test(absoluteModulePath) === false ||

    // Do compile nukleus
    /node_modules\/(nukleus|react-datepicker)/.test(absoluteModulePath) ||

    // Do compile modules...
    /-module(\/|\\)/.test(absoluteModulePath) === true
  );
};
