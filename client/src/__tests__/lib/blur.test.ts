import { shimmer, toBase64 } from "@/lib/blur";

describe("blur helpers", () => {
  it("creates a shimmer SVG string", () => {
    const svg = shimmer(100, 200);
    expect(svg).toContain("<svg");
    expect(svg).toContain("linearGradient");
  });

  it("encodes to base64 correctly", () => {
    const base64 = toBase64("test");
    expect(typeof base64).toBe("string");
  });
});
