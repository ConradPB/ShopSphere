import "@testing-library/jest-dom";
import React from "react";

// Mock next/navigation (app router hooks)
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

// Mock next/image without JSX (use React.createElement to avoid JSX issues)
jest.mock("next/image", () => {
  return function MockNextImage(props: Record<string, unknown>) {
    const { src, alt, ...rest } = props;

    // Remove Next.js-only props that would warn in the DOM
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

    return React.createElement("img", { src, alt, ...safeProps } as any);
  };
});

// Basic supabase mock used by tests
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [], error: null })),
}));

// Provide typed globals for TextEncoder/TextDecoder to avoid `any`
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  var TextEncoder: typeof globalThis.TextEncoder;
  // eslint-disable-next-line @typescript-eslint/no-namespace
  var TextDecoder: typeof globalThis.TextDecoder;
}

// Assign polyfills (Node's util) to global
import { TextEncoder, TextDecoder } from "util";
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Clear mocks between tests
afterEach(() => {
  jest.clearAllMocks();
});
