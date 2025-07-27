module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: ['next', 'next/core-web-vitals'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off' // Optional, if prop-types errors appear
  },
};
