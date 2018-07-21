/* eslint-env node */
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'upl-tracking.js',
    path: path.resolve(__dirname, 'dist/global-export'),
    library: 'UplTracking',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            ignore: [
              'dist/**/*.js',
              '**/*.test.js',
              '**/__mocks__'
            ]
          }
        }
      }
    ]
  }
};
