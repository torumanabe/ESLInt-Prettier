module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  //transformIgnorePatterns: ['/node_modules/(?!@vue/test-utils)'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
