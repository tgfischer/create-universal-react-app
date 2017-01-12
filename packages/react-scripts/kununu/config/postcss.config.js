const autoprefixer = require('autoprefixer');
const postcssPartialImport = require('postcss-partial-import');
const postcssNested = require('postcss-nested');
const postcssSimpleVars = require('postcss-simple-vars');
const postcssOmitImportTilde = require('postcss-omit-import-tilde');

module.exports = {
  plugins: [
    postcssOmitImportTilde(),
    postcssPartialImport({
      extension: '.scss',
    }),
    postcssNested(),
    postcssSimpleVars(),
    autoprefixer(),
  ],
};
