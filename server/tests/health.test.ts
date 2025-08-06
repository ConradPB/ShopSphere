import request from "supertest";
import app from "../src/app";
import { describe, beforeAll, afterAll, it, expect } from "@jest/globals";

describe("Health Endpoint", () => {
  let server: any;

  beforeAll(async () => {
    server = app;
    await ready();
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
