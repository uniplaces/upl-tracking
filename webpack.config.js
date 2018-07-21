/* eslint-env node */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'upl-tracking.js',
    path: path.resolve(__dirname, 'dist/global-export'),
    library: 'UplTracking',
    libraryTarget: 'var'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
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
