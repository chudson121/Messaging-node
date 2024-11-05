const tsConfig = require('./tsconfig.json')
const { pathsToModuleNameMapper } = require('ts-jest')

module.exports = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/**/*-.module.ts',
    '!<rootDir>/src/module/**/*.ts',
    '!<rootDir>/src/infra/prisma/__test__/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },

}