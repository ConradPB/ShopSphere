export function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#E0E0E0" offset="20%" />
          <stop stop-color="#F8F8F8" offset="50%" />
          <stop stop-color="#E0E0E0" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#E0E0E0" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
    </svg>`;
}

export function toBase64(str: string) {
  // Prefer any available btoa implementation in JS environments:
  //  - globalThis.btoa (some test shims)
  //  - globalThis.window?.btoa (tests that set global.window)
  // Fallback to Buffer (Node).
  const globalObj: any =
    typeof globalThis !== "undefined" ? globalThis : undefined;
  const btoaFn = globalObj?.btoa ?? globalObj?.window?.btoa;

  if (typeof btoaFn === "function") {
    return btoaFn(str);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(str).toString("base64");
  }

  throw new Error("No base64 implementation available");
}
