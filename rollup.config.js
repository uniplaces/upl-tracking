import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  plugins: [
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            corejs: 3,
            targets: {
              browsers: [
                'last 2 versions',
                'safari >= 9',
                'ie >= 11',
                'edge >= 14'
              ]
            }
          }
        ]
      ],
      plugins: [
        '@babel/plugin-proposal-object-rest-spread'
      ],
      comments: false,
    }),
  ],
  output: [{
    file: 'dist/upl-tracking.js',
    format: 'umd',
    name: 'UplTracking',
    plugins: [terser()]
  }]
};
