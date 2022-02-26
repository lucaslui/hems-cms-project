/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/tests'],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['<rootDir>/src/**/*.ts','!<rootDir>/src/main/**'],
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  //Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'babel',
  // A preset that is used as a base for Jest's configuration
  preset: '@shelf/jest-mongodb',
  // The test environment that will be used for testing
  testEnvironment: 'node',
  // A map from regular expressions to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // A map to paths to transformers
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // A map to module names or to arrays of module names that allow to stub out resources, like images or styles with a single module.
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/src/(.*)': '<rootDir>/src/$1'
  }
}
