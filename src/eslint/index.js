module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    serviceworker: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      version: '18.2',
    },
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'constructor-super': 'error',
    'no-const-assign': 'error',
    'no-dupe-keys': 'error',
    'no-shadow': 'off',
    'no-trailing-spaces': 'error',
    'no-unreachable': 'error',
    'no-var': 'error',
    'no-warning-comments': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',

    'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
    'react/jsx-key': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/exhaustive-deps': 'error',

    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // this rule is broken in many cases and tsc also catches these errors
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
  },
};
