module.exports = {
  cacheDirectory: 'node_modules/.cache/jest',
  collectCoverage: true,
  collectCoverageFrom: ['frontend/components/**/*.tsx', '!frontend/entrypoints/*.tsx'],
  setupFiles: ['<rootDir>/frontend/tests/config.ts'],
  setupFilesAfterEnv: ['<rootDir>/frontend/tests/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['node_modules'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css)': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
};
