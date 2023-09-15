"use strict";
// spec/routes/orders.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
describe("Order Routes", () => {
    let authToken; // JWT token for authentication (obtained during login)
    let orderId;
    let userId;
    beforeAll(async () => {
        const newUser = await (0, supertest_1.default)(server_1.app).post("/users").send({
            firstName: "x",
            lastName: "x",
            username: "testuser",
            password: "testpassword",
        });
        userId = newUser.body.userId;
        authToken = newUser.body.token;
        const newProduct = await (0, supertest_1.default)(server_1.app)
            .post("/products")
            .set("Authorization", `Bearer ${authToken}`)
            .send({ name: "iphone 15", price: 1000, category: "phone" }); // Replace with valid credentials
        const newOrder = await (0, supertest_1.default)(server_1.app)
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
            const response = await (0, supertest_1.default)(server_1.app)
                .get(`/orders/current/${userId}`)
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Object);
        });
        it("should require authentication", async () => {
            const response = await (0, supertest_1.default)(server_1.app).get("/orders/current/" + userId);
            expect(response.status).toBe(401);
        });
    });
});
