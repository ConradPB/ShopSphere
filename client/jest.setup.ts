import "@testing-library/jest-dom";

// Always mock Supabase in tests so we don’t need env vars or real DB
// Use the special globalThis.jest to avoid TS errors
(globalThis as any).jest?.mock("@/lib/supabase");
