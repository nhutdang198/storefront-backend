// spec/routes/orders.ts

import request from "supertest";
import { app } from "../../src/server";

describe("Order Routes", () => {
  let authToken: string; // JWT token for authentication (obtained during login)
  let orderId: string;
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
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "iphone 15", price: 1000, category: "phone" }); // Replace with valid credentials

    const newOrder = await request(app)
      .post("/orders")
      .send({
        productIds: [newProduct.body.productId],
        quantities: [1],
        userId: newUser.body.userId,
        status: "active",
      })
      .set("Authorization", `Bearer ${authToken}`);

    orderId = newOrder.body.orderId;
  });

  describe("GET /orders/current/:userId", () => {
    it("should return a list of orders by user", async () => {
      const response = await request(app)
        .get(`/orders/current/${userId}`)
        .set("Authorization", `Bearer ${authToken}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Object);
    });

    it("should require authentication", async () => {
      const response = await request(app).get("/orders/current/" + userId);
      expect(response.status).toBe(401);
    });
  });
});
