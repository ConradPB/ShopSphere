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

export function toBase64(str: string): string {
  // Global object typed safely to avoid "any"
  const globalObj: Record<string, unknown> =
    typeof globalThis !== "undefined"
      ? (globalThis as Record<string, unknown>)
      : {};

  const maybeBtoa = globalObj.btoa as ((data: string) => string) | undefined;
  const maybeWindow = globalObj.window as
    | { btoa?: (data: string) => string }
    | undefined;

  const btoaFn = maybeBtoa ?? maybeWindow?.btoa;

  if (typeof btoaFn === "function") {
    return btoaFn(str);
  }

  if (typeof Buffer !== "undefined") {
    return Buffer.from(str).toString("base64");
  }

  throw new Error("No base64 implementation available");
}
