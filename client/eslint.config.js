// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript recommended rules
  ...tseslint.configs.recommended,
  // React configuration
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': hooksPlugin,
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // Disable React import requirement
      'react/prop-types': 'off', // TypeScript handles prop types
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
 
];
