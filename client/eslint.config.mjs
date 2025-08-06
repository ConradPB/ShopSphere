import next from '@next/eslint-plugin-next'
import react from 'eslint-plugin-react'

export default [
  {
    ignores: ['**/*.js', '**/*.ts'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@next/next': next,
      react,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...react.configs.recommended.rules,
    },
  },
]