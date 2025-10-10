import "@testing-library/jest-dom";
import React from "react";

/**
 * Mock next/image to a plain <img> element using React.createElement
 * (avoids using JSX in a .ts file which caused parser complaints previously).
 */
type NextImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  unoptimized?: boolean;
};

jest.mock("next/image", () => {
  return {
    __esModule: true,
    default: (props: NextImageProps) =>
      React.createElement("img", {
        ...props,
        alt: props.alt ?? "mocked image",
      }),
  };
});

/**
 * Mock next/navigation so components using useRouter / usePathname do not error.
 * This prevents tests from requiring the full Next.js App Router to be mounted.
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
 * matchMedia polyfill used by some libs and components.
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated API (kept for compatibility)
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

/** Prevent scrollTo runtime errors in tests */
window.scrollTo = () => {};

/**
 * Optionally silence noisy React warnings during tests.
 * Keep the console error behavior intact for other messages.
 */
const originalConsoleError = console.error.bind(console) as (
  ...args: unknown[]
) => void;

beforeAll(() => {
  console.error = (...args: unknown[]) => {
    const first = args[0];
    if (
      typeof first === "string" &&
      (first.includes("Warning: An update to") ||
        first.includes("Warning: ReactDOM.render"))
    ) {
      // ignore these noisy warnings in Jest output
      return;
    }
    originalConsoleError(...args);
  };
});

afterAll(() => {
  // restore
  console.error = originalConsoleError;
});
