import { shimmer, toBase64 } from "@/lib/blur";

describe("blur utility edge cases", () => {
  it("should generate valid shimmer SVG string", () => {
    const svg = shimmer(50, 50);
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });

  it("should handle toBase64 correctly in Node environment", () => {
    const base64 = toBase64("test");
    expect(typeof base64).toBe("string");
    expect(base64.length).toBeGreaterThan(0);
  });

  it("should return a base64 string when window is defined", () => {
    const original = global.window;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.window = { btoa: (str: string) => "encoded:" + str };
    const result = toBase64("data");
    expect(result).toBe("encoded:data");
    global.window = original;
  });
});
