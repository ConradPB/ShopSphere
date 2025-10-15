import type { Config } from "jest";
import nextJest from "next/jest";

// Create Next.js-aware Jest config
const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  // Default environment for most frontend tests
  testEnvironment: "jest-environment-jsdom",

  // Enable Node environment for files under /lib or /server
  // (so backend-style tests like test-supabase.test.ts can run)
  testEnvironmentOptions: {
    customExportConditions: ["node", "jsdom"],
  },

  moduleDirectories: ["node_modules", "<rootDir>/src", "<rootDir>"],

  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/lib/supabase$": "<rootDir>/src/__mocks__/supabase.ts",
    // Allow direct imports from lib folder
    "^lib/(.*)$": "<rootDir>/lib/$1",
  },

  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",
    "**/_tests_/**/*.test.[jt]s?(x)",
    "<rootDir>/lib/**/*.test.[jt]s?(x)", // 👈 include lib tests
  ],

  // Collect coverage from both src and lib folders
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}", // 👈 include lib coverage
    "!**/node_modules/**",
    "!**/.next/**",
  ],

  coverageReporters: ["text", "lcov", "json", "html"],

  // Optional performance tuning
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default createJestConfig(customJestConfig);
