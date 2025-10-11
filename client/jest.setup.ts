/// <reference types="jest" />
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
 * We export plain jest.fn() stubs so components that call these hooks
 * won't crash in tests.
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
 * Mock next/image so tests render a plain <img>.
 * Filter out Next-only props that would trigger DOM warnings.
 */
jest.mock("next/image", () => {
  return function MockNextImage(props: Record<string, unknown>) {
    const { src, alt, ...rest } = props;

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

    return React.createElement("img", {
      src,
      alt,
      ...safeProps,
    } as Record<string, unknown>);
  };
});

/**
 * Minimal supabase mock so importing modules that create a client
 * won't attempt to initialize a real client during tests.
 * Individual tests can still jest.spyOn/mock these functions as needed.
 */
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [], error: null })),
  getProductById: jest.fn(() =>
    Promise.resolve({ data: null, error: "not found" })
  ),
  getRecommendations: jest.fn(() => Promise.resolve({ data: [], error: null })),
}));

/**
 * IntersectionObserver stub (used by framer-motion / in-view features).
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
 * TextEncoder/TextDecoder polyfill for Node test env.
 * Use Node's util implementations but cast so TS is happy.
 */
import {
  TextEncoder as NodeTextEncoder,
  TextDecoder as NodeTextDecoder,
} from "util";

declare global {
  // expose these names on globalThis for libraries that expect them
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
 * Silence a few known non-critical console errors that happen during tests.
 * This prevents test output pollution while still surfacing real problems.
 */
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  try {
    const first = String(args[0] ?? "");
    if (
      first.includes("blurDataURL") ||
      first.includes(
        "Received `true` for a non-boolean attribute `priority`"
      ) ||
      first.includes(
        "Received `true` for a non-boolean attribute `unoptimized`"
      ) ||
      first.includes("<a> cannot contain a nested <a>") ||
      first.includes("React does not recognize the `blurDataURL` prop") ||
      first.includes(
        "Warning: An update to %s inside a test was not wrapped in act("
      )
    ) {
      return;
    }
  } catch {
    // fall through to default
  }
  return originalConsoleError(...args);
};

/**
 * Clear mocks after each test to avoid state leaking.
 * `afterEach` is provided by Jest (the triple-slash at the top brings in Jest types).
 */
afterEach(() => {
  jest.clearAllMocks();
});
