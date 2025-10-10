import "@testing-library/jest-dom";

// 🧭 Mock Next.js App Router hooks
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

// 🖼️ Mock Next.js Image component safely
jest.mock("next/image", () => {
  return function MockNextImage(props: any) {
    const { src, alt, ...rest } = props;

    // Remove Next.js-only props that cause warnings in Jest
    const safeProps = Object.fromEntries(
      Object.entries(rest).filter(
        ([key]) =>
          !["priority", "unoptimized", "fill", "placeholder"].includes(key)
      )
    );

    // Return a normal img for testing
    return <img src={src} alt={alt} {...safeProps} />;
  };
});

// 🪣 Basic Supabase mock (prevents runtime import errors)
jest.mock("@/lib/supabase", () => ({
  getProducts: jest.fn(() => Promise.resolve({ data: [], error: null })),
}));

// 🧩 Polyfill for TextEncoder/TextDecoder (some Next.js deps require it)
import { TextEncoder, TextDecoder } from "util";
(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// 🧹 Optional cleanup between tests
afterEach(() => {
  jest.clearAllMocks();
});
