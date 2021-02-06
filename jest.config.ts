/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['/node_modules/', '/config/'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
};
