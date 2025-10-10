import "@testing-library/jest-dom";

// ✅ Mock next/image (Next.js 14/15)
jest.mock("next/image", () => ({
  __esModule: true,
  default: function MockedImage(props: any) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

// ✅ Mock next/navigation (to avoid router-related errors in components)
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// ✅ Provide missing browser APIs (some components like MUI need them)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated but used by older libs
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

// ✅ Mock scrollTo to prevent runtime errors
window.scrollTo = jest.fn();

// ✅ Optional: silence known React warnings in tests
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    const [msg] = args;
    if (
      typeof msg === "string" &&
      (msg.includes("Warning: An update to") ||
        msg.includes("Warning: ReactDOM.render"))
    ) {
      return;
    }
    originalError(...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
