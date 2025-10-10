import "@testing-library/jest-dom";
import { expect } from "@jest/globals";
import React from "react";

// Define a strict type for window.matchMedia to prevent 'any' issues
interface MatchMedia {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => unknown) | null;
  addEventListener: (
    type: "change",
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown
  ) => void;
  removeEventListener: (
    type: "change",
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown
  ) => void;
  addListener: (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown
  ) => void;
  removeListener: (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => unknown
  ) => void;
  dispatchEvent: (event: Event) => boolean;
}

// ✅ Mock matchMedia to prevent JSDOM errors in tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string): MatchMedia => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
