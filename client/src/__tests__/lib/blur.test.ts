import { toBase64 } from "@/lib/blur";

describe("blur utility edge cases", () => {
  // Save original window value (could be undefined in some environments)
  const originalWindow = globalThis.window;

  afterEach(() => {
    // Restore original window value safely using unknown casts (no `any`)
    (globalThis as unknown as Record<string, unknown>)["window"] =
      originalWindow as unknown;
  });

  it("should return a base64 string when window is defined", () => {
    const mockWindow = {
      btoa: (str: string): string => "encoded:" + str,
    };

    // assign mock window (safe cast)
    (globalThis as unknown as Record<string, unknown>)["window"] =
      mockWindow as unknown;

    const result = toBase64("data");
    expect(result).toBe("encoded:data");
  });

  it("should return a base64 string when window is undefined", () => {
    // simulate no window by setting the global window value to undefined
    (globalThis as unknown as Record<string, unknown>)["window"] = undefined;

    const result = toBase64("data");
    expect(result).toBe("ZGF0YQ==");
  });
});
