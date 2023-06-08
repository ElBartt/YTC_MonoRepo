/* eslint-disable */
export default {
  displayName: 'ytc-back',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/ytc-back',
  coverageReporters: ['json-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/.github/',
    '<rootDir>/.docs/',
    '<rootDir>/coverage/',
    '<rootDir>/utils/',
    '/server.ts',
  ],
};
