import "@testing-library/jest-dom";
import React from "react";

/**
 * Mock next/image to a plain <img> element using React.createElement
 * (avoids using JSX in a .ts file which caused the parser errors).
 */
jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: (props: any) =>
      // createElement avoids JSX parsing issues in .ts files
      React.createElement("img", {
        ...props,
        alt: props.alt ?? "mocked image",
      }),
  };
});

/**
 * Mock next/navigation (useRouter / usePathname) to avoid "app router not mounted"
 * errors in tests that render components using those hooks.
 */
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    back: jest.fn(),
  }),
  usePathname: () => "/",
}));

/**
 * Provide matchMedia polyfill used by some libs and components.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated API (some libs still call)
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

/** Prevent scrollTo runtime errors in tests */
window.scrollTo = jest.fn();

/**
 * Optionally silence noisy React warnings during tests.
 * Keeps the console error behavior intact for other messages.
 */
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      (first.includes("Warning: An update to") ||
        first.includes("Warning: ReactDOM.render"))
    ) {
      return; // ignore these noisy warnings in Jest output
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  console.error = originalConsoleError;
});
