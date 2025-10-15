import { toBase64 } from "@/lib/blur";

describe("blur utility edge cases", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    // ✅ Restore original window safely
    if (originalWindow) {
      Object.defineProperty(globalThis, "window", {
        value: originalWindow,
        writable: true,
      });
    } else {
      delete (globalThis as { window?: unknown }).window;
    }
  });

  it("should return a base64 string when window is defined", () => {
    // ✅ Mock window object safely
    const mockWindow = {
      btoa: (str: string): string => "encoded:" + str,
    };

    Object.defineProperty(globalThis, "window", {
      value: mockWindow,
      writable: true,
    });

    const result = toBase64("data");
    expect(result).toBe("encoded:data");
  });

  it("should return a base64 string when window is undefined", () => {
    // ✅ Temporarily remove window
    delete (globalThis as { window?: unknown }).window;

    const result = toBase64("data");
    expect(result).toBe("ZGF0YQ==");
  });
});
