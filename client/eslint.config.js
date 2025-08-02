import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,
  // TypeScript recommended rules (includes @typescript-eslint plugin)
  ...tseslint.configs.recommended,
  // React recommended rules
  reactPlugin.configs.flat.recommended,
  // Custom configuration for TypeScript and Next.js files
  {
    files: ['**/*.ts', '**/*.tsx'],
    ignores: ['.next/**', 'node_modules/**'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
      '@next/next': nextPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      sourceType: 'module',
      globals: {
        browser: true,
        es2020: true,
        node: true,
        React: 'writable', // Avoid 'React is not defined'
        console: 'readonly', // Avoid 'console is not defined'
        process: 'readonly', // Avoid 'process is not defined'
      },
    },
    settings: {
      react: {
        version: 'detect', // Auto-detect React version
      },
    },
    rules: {
      // React rules
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+
      'react/prop-types': 'off', // TypeScript handles prop types
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
      // Next.js rules
      '@next/next/no-html-link-for-pages': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/google-font-display': 'off', // Disabled temporarily
      '@next/next/no-img-element': 'warn', // Allow <img> for now
      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Include all recommended Next.js rules
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
];
