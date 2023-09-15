// spec/routes/products.ts

import request from "supertest";
import { app } from "../../src/server";

describe("Product Routes", () => {
  let authToken: string; // JWT token for authentication (obtained during login)
  let productId: string;
  let userId: string;

  beforeAll(async () => {
    const newUser = await request(app).post("/users").send({
      firstName: "x",
      lastName: "x",
      username: "testuser",
      password: "testpassword",
    });

    userId = newUser.body.userId;
    authToken = newUser.body.token;

    const newProduct = await request(app)
      .post("/products")
      .send({ name: "iphone 15", price: 1000, category: "phone" })
      .set("Authorization", `Bearer ${authToken}`);

    productId = newProduct.body.productId;
  });

  describe("GET /products", () => {
    it("should return a list of products", async () => {
      const response = await request(app)
        .get("/products")
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should require authentication", async () => {
      const response = await request(app).get("/products");
      expect(response.status).toBe(401);
    });
  });

  describe("GET /products/:productId", () => {
    it("should return product details by ID", async () => {
      const response = await request(app)
        .get(`/products/${productId}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
    });

    it("should require authentication", async () => {
      const response = await request(app).get(`/products/${productId}`);
      expect(response.status).toBe(401);
    });

    it("should handle product not found", async () => {
      const response = await request(app)
        .get(`/products/${productId + "000_xxx"}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(404);
    });
  });
});
