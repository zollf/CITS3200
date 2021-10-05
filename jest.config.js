module.exports = {
  cacheDirectory: 'node_modules/.cache/jest',
  collectCoverage: true,
  collectCoverageFrom: [
    'frontend/components/**/*.tsx',
    '!frontend/entrypoints/*.tsx',
    'frontend/lib/**/*.tsx',
    'frontend/lib/**/*.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
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
