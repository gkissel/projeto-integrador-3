/** @type { import('eslint').Linter.Config } */
module.exports = {
  extends: [
    'airbnb',
    '@rocketseat/eslint-config/node',
    'plugin:drizzle/recommended',
  ],
  plugins: ['simple-import-sort', 'drizzle'],
  rules: {
    'simple-import-sort/imports': 'error',
    'react/jsx-filename-extension': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/button-has-type': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
  },
  ignorePatterns: ['package.json'],
}
