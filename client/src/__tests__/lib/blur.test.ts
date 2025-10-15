import createBlurDataURL from "@/lib/blur";

describe("createBlurDataURL", () => {
  it("returns a base64 string", () => {
    const result = createBlurDataURL("#fff");
    expect(typeof result).toBe("string");
    expect(result.startsWith("data:image")).toBe(true);
  });
});
