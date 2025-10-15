import { toBase64 } from "@/lib/blur";

describe("blur utility edge cases", () => {
  const originalWindow = global.window;

  afterEach(() => {
    global.window = originalWindow;
  });

  it("should return a base64 string when window is defined", () => {
    // ✅ ensure TypeScript accepts the mock
    (global as any).window = { btoa: (str: string) => "encoded:" + str };
    const result = toBase64("data");
    expect(result).toBe("encoded:data");
  });

  it("should return a base64 string when window is undefined", () => {
    (global as any).window = undefined;
    const result = toBase64("data");
    expect(result).toBe("ZGF0YQ==");
  });
});
