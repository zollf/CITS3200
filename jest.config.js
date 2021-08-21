module.exports = {
  cacheDirectory: 'node_modules/.cache/jest',
  collectCoverage: true,
  collectCoverageFrom: ['frontend/components/**/*.tsx', '!frontend/entrypoints/*.tsx'],
  setupFilesAfterEnv: ['<rootDir>/frontend/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css)': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      tsconfig: {
        jsx: 'react',
      },
    },
  },
};
