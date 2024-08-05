/** @type { import('eslint').Linter.Config } */
module.exports = {
  extends: ['airbnb', '@rocketseat/eslint-config/react'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
    'react/jsx-filename-extension': 'off',
  },
  ignorePatterns: ['package.json'],
}
