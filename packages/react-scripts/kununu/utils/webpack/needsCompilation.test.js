const needsCompilation = require('./needsCompilation');

test("returns true if module path does not contain 'node_modules'", () => {
  const absoluteModulePathIndex = '/Users/$USER/workspace/integration-app/src/index.js';
  const absoluteModulePathGetLocale = '/Users/$USER/workspace/integration-app/src/lib/getLocale.js';
  const absoluteModulePathSimplePage = '/Users/$USER/workspace/integration-app/pages/SimplePage.jsx';

  expect(needsCompilation(absoluteModulePathIndex)).toBe(true);
  expect(needsCompilation(absoluteModulePathGetLocale)).toBe(true);
  expect(needsCompilation(absoluteModulePathSimplePage)).toBe(true);
});

test('returns true if module is nukleus', () => {
  const absolutePathToNukleusInIntegrationApp = '/Users/$USER/workspace/integration-app/node_modules/nukleus/dist/index.js';
  const absolutePathToNukleusInIntegrationAppCss = '/Users/$USER/workspace/integration-app/node_modules/nukleus/dist/main.css';
  const absolutePathToNukleuesInAppModule = '/Users/$USER/workspace/integration-app/node_modules/@kununu/app-module/node_modules/nukleus/dist/index.js';
  const absolutePathToNukleuesInAppModuleCss = '/Users/$USER/workspace/integration-app/node_modules/@kununu/app-module/node_modules/nukleus/dist/main.css';

  expect(needsCompilation(absolutePathToNukleusInIntegrationApp)).toBe(true);
  expect(needsCompilation(absolutePathToNukleusInIntegrationAppCss)).toBe(true);
  expect(needsCompilation(absolutePathToNukleuesInAppModule)).toBe(true);
  expect(needsCompilation(absolutePathToNukleuesInAppModuleCss)).toBe(true);
});

test('test returns true if is app module', () => {
  const absolutePathToAppModulePageA = '/Users/$USER/workspace/integration-app/node_modules/@kununu/app-a-module/pages/PageA.js';
  const absolutePathToAppModulePageB = '/Users/$USER/workspace/integration-app/node_modules/@kununu/app-b-module/pages/PageB.js';

  expect(needsCompilation(absolutePathToAppModulePageA)).toBe(true);
  expect(needsCompilation(absolutePathToAppModulePageB)).toBe(true);
});

test('test returns false for normal node_modules', () => {
  const absolutePathToNodeModules = '/Users/$USER/workspace/integration-app/node_modules/react';
    // important for in development when using npm link
  const absoltePathToAppModuleNodeModules = '/Users/$USER/workspace/integration-app/node_modules/@kununu/app-module/node_modules/react-intl';

  expect(needsCompilation(absolutePathToNodeModules)).toBe(false);
  expect(needsCompilation(absoltePathToAppModuleNodeModules)).toBe(false);
});
