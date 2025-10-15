import { toBase64 } from "@/lib/blur";

describe("blur utility edge cases", () => {
  const originalWindow = globalThis.window;

  afterEach(() => {
    // ✅ Restore original window after each test
    (globalThis as typeof globalThis & { window?: Window }).window =
      originalWindow;
  });

  it("should return a base64 string when window is defined", () => {
    // ✅ Mock window with a properly typed object (no `any`)
    const mockWindow = {
      btoa: (str: string): string => "encoded:" + str,
    } as unknown as Window;

    (globalThis as typeof globalThis & { window?: Window }).window = mockWindow;

    const result = toBase64("data");
    expect(result).toBe("encoded:data");
  });

  it("should return a base64 string when window is undefined", () => {
    (globalThis as typeof globalThis & { window?: Window }).window = undefined;
    const result = toBase64("data");
    expect(result).toBe("ZGF0YQ==");
  });
});
