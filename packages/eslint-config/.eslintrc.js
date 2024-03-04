module.exports = {
  extends: ['@rocketseat/eslint-config/node', 
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'plugin:react-hooks/recommended',
  'plugin:prettier/recommended'
],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  }
}
