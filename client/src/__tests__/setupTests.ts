import "@testing-library/jest-dom";
import React from "react";

// --- Mock Next.js navigation & router ---
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// --- Mock next/image so Jest doesn’t crash on optimization ---
jest.mock("next/image", () => (props: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || "mocked image"} />;
});

// --- Silence console noise from async server components ---
const origError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === "string" && args[0].includes("ReactDOMServer"))
      return;
    origError(...args);
  };
});
afterAll(() => {
  console.error = origError;
});
