module.exports = {
  extends: 'kununu-universal',
  rules: {
    'comma-dangle': ['error', {
      // Default `comma-dangle` options from Airbnb eslint config
      // https://github.com/airbnb/javascript/blob/e037d29b93e5b61434deb9ba485f76c6406b7cb3/packages/eslint-config-airbnb-base/rules/errors.js#L5-L8
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',

      // Disable trailing function commas because we're not transpiling yet and
      // node doesn't support this yet
      functions: 'never',
    }],

    // React is imported in the kununu/template files, but shouldn't be a dependency
    'import/no-extraneous-dependencies': 'off',

    // In the kununu/template files we require() things from `@kununu/react-universal-scripts`
    'import/no-unresolved': ['error', {ignore: ['^@kununu\/react-universal-scripts']}],
  },
};
