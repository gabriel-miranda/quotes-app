module.exports = {
  setupFiles: [
    '<rootDir>/jest.setup.js',
  ],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/src/www/.next/',
    '<rootDir>/node_modules/',
  ]
};
