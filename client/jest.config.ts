import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  testEnvironment: "jest-environment-jsdom",

  // Ensure absolute imports work properly
  moduleDirectories: ["node_modules", "<rootDir>/src"],

  // Path aliases (maps @/ to src/)
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // Mock Supabase for tests to avoid calling the real API
    "^@/lib/supabase$": "<rootDir>/src/__mocks__/supabase.ts",
  },

  // Load our setup file after env setup
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"],

  // Recognize test files anywhere in __tests__ folders
  testMatch: [
    "**/__tests__/**/*.(test|spec).[jt]s?(x)",
    "**/_tests_/**/*.(test|spec).[jt]s?(x)",
  ],

  // Coverage collection setup
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/index.ts", // skip re-exports
    "!src/**/_*.{ts,tsx}", // skip private helpers if you wish
    "!src/__tests__/**", // skip test files
    "!src/__mocks__/**", // skip mocks
  ],
  coverageReporters: ["text", "lcov", "json", "html"],
};

export default createJestConfig(customJestConfig);
