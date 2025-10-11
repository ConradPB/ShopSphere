import "@testing-library/jest-dom";
import React from "react";

/**
 * Ensure Supabase env vars exist for CI/test environments.
 */
process.env.NEXT_PUBLIC_SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://localhost";
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "anon";

/**
 * Mocks for Next.js App Router hooks used in client components.
 */
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  })),
  usePathname: jest.fn(() => "/"),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

/**
 * Mock next/image so it renders a plain <img> during tests.
 * We strip Next-only props that would otherwise cause DOM warnings.
 */
jest.mock("next/image", () => {
  return function MockNextImage(props: Record<string, unknown>) {
    const { src, alt, ...rest } = props;

    // Remove Next.js-only props that cause console warnings in JSDOM
    const safeProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) =>
          ![
            "priority",
            "unoptimized",
            "fill",
            "placeholder",
            "blurDataURL",
            "sizes",
          ].includes(key)
      )
    );

    // Use React.createElement to avoid JSX transform issues
    return React.createElement("img", {
      src,
      alt,
      ...safeProps,
    } as Record<string, unknown>);
  };
});

/**
 * Minimal supabase mock so importing modules that call supabase won't
 * attempt to initialize a real client during tests.
 */
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [], error: null })),
  getProductById: jest.fn(() =>
    Promise.resolve({ data: null, error: "not found" })
  ),
  getRecommendations: jest.fn(() => Promise.resolve({ data: [], error: null })),
}));

/**
 * IntersectionObserver stub for framer-motion / in-view usage in tests.
 */
class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
Object.defineProperty(globalThis, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

/**
 * Polyfill TextEncoder/TextDecoder for the test environment.
 * Cast via unknown to keep TypeScript happy.
 */
import {
  TextEncoder as NodeTextEncoder,
  TextDecoder as NodeTextDecoder,
} from "util";

declare global {
  var TextEncoder: typeof globalThis.TextEncoder;
  var TextDecoder: typeof globalThis.TextDecoder;
}

(
  globalThis as unknown as { TextEncoder: typeof globalThis.TextEncoder }
).TextEncoder = NodeTextEncoder as unknown as typeof globalThis.TextEncoder;

(
  globalThis as unknown as { TextDecoder: typeof globalThis.TextDecoder }
).TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

/**
 * Silence known non-critical console warnings.
 */
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  try {
    const msg = String(args[0] ?? "");
    if (
      msg.includes("blurDataURL") ||
      msg.includes("Received `true` for a non-boolean attribute `priority`") ||
      msg.includes(
        "Received `true` for a non-boolean attribute `unoptimized`"
      ) ||
      msg.includes("<a> cannot contain a nested <a>") ||
      msg.includes("React does not recognize the `blurDataURL` prop") ||
      msg.includes(
        "Warning: An update to %s inside a test was not wrapped in act("
      )
    ) {
      return;
    }
  } catch {
    // ignore
  }
  return originalConsoleError(...args);
};

/**
 * Clean mocks between tests.
 */
afterEach(() => {
  jest.clearAllMocks();
});
