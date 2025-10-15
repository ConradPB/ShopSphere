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
  // Prefer a runtime btoa implementation if available on globalThis
  const maybeBtoa = (globalThis as { btoa?: (s: string) => string }).btoa;
  if (typeof maybeBtoa === "function") {
    return maybeBtoa(str);
  }

  // Otherwise, server-side fallback using Buffer
  return Buffer.from(str).toString("base64");
}
