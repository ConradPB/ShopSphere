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
