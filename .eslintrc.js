module.exports = {
  env: {
    es6: true,
    browser: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  },
  extends: [
    "eslint:recommended"
  ],
  parser: "babel-eslint",
  rules: {
    "no-console": ["error", { allow: ["warn", "error", "info"] }],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error","always"],
    "no-trailing-spaces": ["error"],
    "object-curly-spacing": ["error", "always"]
  }
}
