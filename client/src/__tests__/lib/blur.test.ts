import { toBase64 } from "@/lib/blur";

describe("blur utility edge cases", () => {
  // keep original reference so we can restore it reliably
  const originalBtoa = (globalThis as unknown as Record<string, unknown>).btoa;

  afterEach(() => {
    // restore original btoa (or remove it if it was not present originally)
    if (typeof originalBtoa === "undefined") {
      try {
        // deleting in some environments may throw; swallow errors
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (globalThis as any).btoa;
      } catch {
        /* ignore */
      }
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (globalThis as any).btoa = originalBtoa;
    }
  });

  it("uses globalThis.btoa when available", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (globalThis as any).btoa = (str: string) => "encoded:" + str;
    const result = toBase64("data");
    expect(result).toBe("encoded:data");
  });

  it("falls back to Buffer when btoa is not available", () => {
    // remove any btoa to simulate server-side
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (globalThis as any).btoa;
    } catch {
      /* ignore */
    }
    const result = toBase64("data");
    expect(result).toBe(Buffer.from("data").toString("base64"));
  });
});
