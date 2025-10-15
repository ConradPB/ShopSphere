import { createClient } from "@supabase/supabase-js";

jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("testSupabase helper", () => {
  const mockFrom = jest.fn().mockReturnThis();
  const mockSelect = jest.fn();

  beforeEach(() => {
    (createClient as jest.Mock).mockReturnValue({
      from: mockFrom,
      select: mockSelect,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("creates a Supabase client with correct URL and key", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://fake-url.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "fake-key";

    const { createClient: mockCreateClient } = await import(
      "@supabase/supabase-js"
    );
    expect(mockCreateClient).toHaveBeenCalledTimes(0);

    // Dynamically import after env setup
    await import("./");

    expect(mockCreateClient).toHaveBeenCalledWith(
      "https://fake-url.supabase.co",
      "fake-key"
    );
  });

  it("logs error when Supabase returns an error", async () => {
    mockSelect.mockResolvedValueOnce({
      data: null,
      error: { message: "Something went wrong" },
    });

    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const { testSupabase } = await import("../../lib/test-supabase");
    await testSupabase();

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Supabase Error:",
      "Something went wrong"
    );
    consoleErrorSpy.mockRestore();
  });

  it("logs products when query succeeds", async () => {
    const fakeData = [{ id: 1, title: "Prod" }];
    mockSelect.mockResolvedValueOnce({ data: fakeData, error: null });

    const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

    const { testSupabase } = await import("./test-supabase");
    await testSupabase();

    expect(consoleLogSpy).toHaveBeenCalledWith("Products:", fakeData);
    consoleLogSpy.mockRestore();
  });
});
