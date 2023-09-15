// spec/routes/users.ts

import request from "supertest";
import { app } from "../../src/server";

describe("User Routes", () => {
  let authToken: string; // JWT token for authentication (obtained during login)
  let userId: string;

  beforeAll(async () => {
    const newUser = await request(app).post("/users").send({
      firstName: "x",
      lastName: "x",
      username: "testuser",
      password: "testpassword",
    });

    authToken = newUser.body.token;
    userId = newUser.body.userId;
  });

  describe("GET /users", () => {
    it("should return a list of users", async () => {
      const response = await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should require authentication", async () => {
      const response = await request(app).get("/users");
      expect(response.status).toBe(401);
    });
  });

  describe("GET /users/:userId", () => {
    it("should return user details by ID", async () => {
      const response = await request(app)
        .get(`/users/${userId}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
    });

    it("should require authentication", async () => {
      const response = await request(app).get(`/users/${userId}`);
      expect(response.status).toBe(401);
    });

    it("should handle user not found", async () => {
      const response = await request(app)
        .get(`/users/${userId + "000_xxx"}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(404);
    });
  });
});
