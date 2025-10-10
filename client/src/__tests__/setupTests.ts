import "@testing-library/jest-dom";
import React from "react";

/**
 * Mocks for Next.js App Router hooks used in client components.
 * Keep these lightweight — tests will assert behaviour via redux / UI.
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
 * We carefully strip Next-specific props that would otherwise warn.
 */
jest.mock("next/image", () => {
  return function MockNextImage(props: Record<string, unknown>) {
    const { src, alt, ...rest } = props;

    // Remove Next.js-only props that will produce console warnings in JSDOM
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

    // Use React.createElement to avoid JSX transform issues inside test setup
    // cast is localized and safe for test shim
    return React.createElement("img", {
      src,
      alt,
      ...safeProps,
    } as unknown as Record<string, unknown>);
  };
});

/**
 * Lightweight supabase mock so importing modules that call supabase won't
 * attempt to initialize real clients during tests.
 */
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [], error: null })),
  getProductById: jest.fn(() =>
    Promise.resolve({ data: null, error: "not found" })
  ),
  getRecommendations: jest.fn(() => Promise.resolve({ data: [], error: null })),
}));

/**
 * Polyfill TextEncoder/TextDecoder for the test environment.
 *
 * Node's `util` exports TextEncoder/TextDecoder which don't perfectly match
 * the DOM types in TypeScript. Cast via `unknown` into the DOM `typeof`
 * to satisfy the compiler without using `any`.
 */
import {
  TextEncoder as NodeTextEncoder,
  TextDecoder as NodeTextDecoder,
} from "util";

declare global {
  // expose DOM-like types to TypeScript
  var TextEncoder: typeof globalThis.TextEncoder;
  var TextDecoder: typeof globalThis.TextDecoder;
}

(
  globalThis as unknown as {
    TextEncoder: typeof globalThis.TextEncoder;
    TextDecoder: typeof globalThis.TextDecoder;
  }
).TextEncoder = NodeTextEncoder as unknown as typeof globalThis.TextEncoder;

(
  globalThis as unknown as {
    TextEncoder: typeof globalThis.TextEncoder;
    TextDecoder: typeof globalThis.TextDecoder;
  }
).TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;
