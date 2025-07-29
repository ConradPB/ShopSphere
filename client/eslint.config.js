import nextPlugin from 'eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import eslint from '@eslint/js';

export default [
  eslint.configs.recommended,
  {
    plugins: {
      next: nextPlugin,
      react: reactPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
    },
    languageOptions: {
      sourceType: 'module',
      globals: {
        browser: true,
        es2020: true,
        node: true,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'next/core-web-vitals': 'error',
    },
  },
];
