/// <reference types="jest" />
import { jest, afterEach } from "@jest/globals";
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
 * Mock next/navigation hooks so client components using them don't crash in tests.
 */
jest.unstable_mockModule // guard: if using node ESM jest; if not, fallback to jest.mock below
  ? void 0
  : void 0; // noop so TS doesn't complain about unstable_mockModule being missing in some setups

// Use jest.mock normally — importing jest from @jest/globals gives us a runtime value.
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

/**
 * Mock next/image -> render a plain <img /> in tests and strip Next-only props.
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
 * Minimal supabase mock to avoid creating a real client during tests.
 * Individual tests can still override these with jest.spyOn/mockResolvedValue.
 */
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [], error: null })),
  getProductById: jest.fn(() =>
    Promise.resolve({ data: null, error: "not found" })
  ),
  getRecommendations: jest.fn(() => Promise.resolve({ data: [], error: null })),
}));

/**
 * IntersectionObserver stub (framer-motion / in-view utilities depend on it).
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
 * TextEncoder/TextDecoder polyfill for Node test env (use Node's util).
 * Cast to satisfy TypeScript's global types.
 */
import {
  TextEncoder as NodeTextEncoder,
  TextDecoder as NodeTextDecoder,
} from "util";

declare global {
  // expose these names on globalThis for libraries that expect them
  // eslint-disable-next-line vars-on-top
  var TextEncoder: typeof globalThis.TextEncoder;
  // eslint-disable-next-line vars-on-top
  var TextDecoder: typeof globalThis.TextDecoder;
}

(
  globalThis as unknown as { TextEncoder: typeof globalThis.TextEncoder }
).TextEncoder = NodeTextEncoder as unknown as typeof globalThis.TextEncoder;
(
  globalThis as unknown as { TextDecoder: typeof globalThis.TextDecoder }
).TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

/**
 * Silence known non-actionable console errors that appear during tests
 * (filters prevent noisy output while still showing real errors).
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
    // fall through to original
  }
  return originalConsoleError(...args);
};

/**
 * Clear mocks after each test to avoid state leaking.
 */
afterEach(() => {
  jest.clearAllMocks();
});
