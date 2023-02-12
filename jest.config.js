module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
};
