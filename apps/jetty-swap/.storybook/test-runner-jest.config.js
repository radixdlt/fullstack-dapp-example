const { getJestConfig } = require('@storybook/test-runner')

const testRunnerConfig = getJestConfig()

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  // The default Jest configuration comes from @storybook/test-runner
  ...testRunnerConfig,
  /** Add your own overrides below
   * @see https://jestjs.io/docs/configuration
   */
  testEnvironmentOptions: {
    'jest-playwright': {
      devices: ['iPhone 11', 'Desktop Chrome']
    }
  },
  testTimeout: 20000 // default timeout is 15s
}
