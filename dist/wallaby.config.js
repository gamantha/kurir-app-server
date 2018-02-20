'use strict';

module.exports = function (wallaby) {
  return {
    files: ['./**/*.js', '!./test/**/*_test.js'],

    tests: ['./test/**/*_test.js'],
    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    testFramework: 'mocha',
    reportUnhandledPromises: false,
    env: {
      type: 'node'
    }
  };
};