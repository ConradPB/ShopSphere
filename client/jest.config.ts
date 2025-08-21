import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/_tests_/**/*.test.[jt]s?(x)",
    "**/__tests__/**/*.test.[jt]s?(x)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/app/**/*.{ts,tsx}",
    "src/lib/**/*.{ts,tsx}",
    "src/redux/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
  coverageReporters: ["text", "lcov", "html"],
};

export default createJestConfig(customJestConfig);
