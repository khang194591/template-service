export default {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: './',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./test/setup-app.ts'],
  testRegex: 'test.e2e.ts',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2021',
        },
      },
    ],
  },
  collectCoverageFrom: ['./src/**/*.(t|j)s'],
  coveragePathIgnorePatterns: [
    '.module.ts',
    '<rootDir>/src/main.ts',
    '.mock.ts',
    '.test.ts',
    "libs"
  ],
  moduleNameMapper: {
    // '@share/common/(.*)': '<rootDir>/libs/common/$1',
    '@share/common': '<rootDir>/src/libs/common',
  },
};
