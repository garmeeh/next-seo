module.exports = {
  testEnvironment: 'jsdom',
  testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js|jsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/.history/',
    '<rootDir>/node_modules/',
    '<rootDir>/cypress/',
    '<rootDir>/e2e/',
    '<rootDir>/lib/',
  ],
};
