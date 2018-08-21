/* eslint-env node */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var common = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            ignore: ['dist/**/*.js', '**/*.test.js', '**/__mocks__']
          }
        }
      }
    ]
  }
};

var optimization = {
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};

module.exports = [
  Object.assign({}, common, optimization, {
    name: 'global-export',
    entry: './src/index.js',
    output: {
      filename: 'upl-tracking.js',
      path: path.resolve(__dirname, 'dist/global-export'),
      library: 'UplTracking',
      libraryTarget: 'var'
    }
  })
];
