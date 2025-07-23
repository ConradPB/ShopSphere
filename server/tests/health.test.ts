// server/tests/health.test.ts
import request from "supertest";
import app from "../src/app";

describe("Health Endpoint", () => {
  let server: any;

  beforeAll(async () => {
    server = app;
    await server.ready();
  });

  afterAll(async () => {
    await server.close();
  });

  it("returns status ok", async () => {
    const res = await request(server.server).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  }, 10000);
});
