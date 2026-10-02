/**
 * @typedef {'time' | 'word'} TestModeType
 *
 * @typedef {Object} ITestConfig
 * @property {number} testTime - Selected test time in seconds (e.g. 15, 30, 60)
 * @property {TestModeType} testMode - Selected mode ('time' or 'word')
 * @property {number} testWords - Selected word count target (e.g. 10, 20, 30)
 */

export const DefaultTestConfig = {
  testTime: 15,
  testMode: 'time',
  testWords: 10
};

export const TestModeSchema = {
  validate: (config) => {
    return Boolean(
      config &&
      typeof config.testTime === 'number' &&
      typeof config.testMode === 'string' &&
      typeof config.testWords === 'number'
    );
  }
};

