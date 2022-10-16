const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './e2e',
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  modulePaths: ['.'],
  moduleDirectories: ['node_modules', '.'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/types.ts',
    '!src/index.tsx',
    '!src/jsonld/TEMPLATE.tsx',
    '!src/utils/toJson.tsx',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.history/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
    '<rootDir>/e2e/',
    '<rootDir>/lib/',
  ],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
