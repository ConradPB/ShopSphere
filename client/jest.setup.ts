import "@testing-library/jest-dom";

// Always mock Supabase in tests so we don’t need env vars or real DB
jest.mock("@/lib/supabase");
