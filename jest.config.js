module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  modulePaths: ['/shared/vendor/modules'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleDirectories: ['node_modules', 'bower_components', 'shared'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
    '\\.(png|jpg|jpeg|gif|eot|otf|webp|ttf|woff|woff2)$': '<rootDir>/fileTransformer.js',
  },
  moduleNameMapper: {
    '^@/(.*svg)(\\?inline)$': '<rootDir>/src/$1',
    '^@/(.*svg)(\\?component)$': '<rootDir>/src/$1',
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
};
