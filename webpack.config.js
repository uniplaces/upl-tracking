/* eslint-env node */
var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var options = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    browsers: [
                      'last 2 versions',
                      'safari >= 9',
                      'edge >= 14'
                    ]
                  }
                }
              ]
            ],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread'
            ],
            ignore: [
              'dist/**/*.js',
              '**/*.test.js',
              '**/__mocks__'
            ],
            comments: false
          }
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
      path: path.resolve(__dirname, 'dist'),
      filename: 'upl-tracking.js',
      library: 'UplTracking',
      libraryTarget: 'umd'
    }
  })
];
