import request from "supertest";
import app from "../src/app";

describe("Health Endpoint", () => {
  let server: any;

  beforeAll(async () => {
    server = app; // Fastify instance
    await server.ready(); // Prepare Fastify for testing
  });

  afterAll(async () => {
    await server.close(); // Close server to avoid open handles
  });

  it("returns status ok", async () => {
    const res = await request(server.server).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok" });
  }, 10000); // Increase timeout to 10s
});
