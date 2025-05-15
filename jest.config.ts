import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/js-with-ts', // ✅ supports JSX
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
