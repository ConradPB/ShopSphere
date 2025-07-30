require('ts-node').register({
  project: './tsconfig.json',
  esm: true,
  transpileOnly: true,
});
require('tsconfig-paths/register');
require('./lib/test-supabase.ts');
