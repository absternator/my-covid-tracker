// jest.config.mjs
import nextJest from 'next/jest.js';
import { Config } from 'jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest

const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jsdom',
  clearMocks: true,
  coverageReporters: ['json', 'text', 'lcov', 'cobertura'],
  reporters: ['default', 'jest-junit'],
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
