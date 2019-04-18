module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: '3.0.0',
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
  comments: false
}
