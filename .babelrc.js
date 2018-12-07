module.exports = {
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
  comments: false
}
