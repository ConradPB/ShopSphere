import "@testing-library/jest-dom";
import { expect } from "@jest/globals";

// Define a type for window.matchMedia to avoid 'any'
interface MatchMedia {
  matches: boolean;
  media: string;
  onchange: ((this: MediaQueryList, ev: MediaQueryListEvent) => any) | null;
  addEventListener: (
    type: "change",
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  removeEventListener: (
    type: "change",
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  addListener: (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  removeListener: (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ) => void;
  dispatchEvent: (event: Event) => boolean;
}

// Mock matchMedia to prevent test environment errors
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

// Mock Next.js image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>): JSX.Element => (
    <img {...props} alt={props.alt ?? "mocked image"} />
  ),
}));

// Extend Jest matchers
expect.extend({
  toBeVisible(received: HTMLElement): { pass: boolean; message: () => string } {
    const isVisible = received.offsetParent !== null;
    return {
      pass: isVisible,
      message: () =>
        isVisible ? "Element is visible" : "Element is not visible",
    };
  },
});
