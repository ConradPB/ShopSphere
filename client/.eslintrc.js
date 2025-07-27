module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ['next', 'next/core-web-vitals', 'eslint:recommended'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { varsIgnorePattern: '^_' }],
  },
};
