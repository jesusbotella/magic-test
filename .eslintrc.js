module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    jest: true,
  },
  globals: {
    fetch: false
  },
  rules: {
    'comma-dangle': 'off',
    'object-curly-newline': 'off'
  }
};
