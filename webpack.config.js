/* eslint-env node */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var options = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
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
  Object.assign({}, options, {
    name: 'global-export',
    entry: './src/index.js',
    output: {
      filename: 'upl-tracking.js',
      path: path.resolve(__dirname, 'dist/global-export'),
      library: 'UplTracking',
      libraryTarget: 'var'
    }
  }),
  Object.assign({}, options, {
    name: 'umd',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/umd'),
      filename: 'upl-tracking.js',
      library: 'UplTracking',
      libraryTarget: 'umd'
    }
  }),
  Object.assign({}, options, {
    name: 'commonjs',
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist/cjs'),
      filename: 'upl-tracking.js',
      library: 'UplTracking',
      libraryTarget: 'commonjs'
    }
  }),
];
