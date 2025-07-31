require("ts-node").register({
  project: "./tsconfig.json",
  esm: true,
  transpileOnly: true,
});
require("tsconfig-paths/register");
import "./lib/test-supabase.js";
