"use strict";
// spec/routes/products.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
describe("Product Routes", () => {
    let authToken; // JWT token for authentication (obtained during login)
    let productId;
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
            .send({ name: "iphone 15", price: 1000, category: "phone" })
            .set("Authorization", `Bearer ${authToken}`);
        productId = newProduct.body.productId;
    });
    describe("GET /products", () => {
        it("should return a list of products", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get("/products")
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
        it("should require authentication", async () => {
            const response = await (0, supertest_1.default)(server_1.app).get("/products");
            expect(response.status).toBe(401);
        });
    });
    describe("GET /products/:productId", () => {
        it("should return product details by ID", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get(`/products/${productId}`)
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(200);
        });
        it("should require authentication", async () => {
            const response = await (0, supertest_1.default)(server_1.app).get(`/products/${productId}`);
            expect(response.status).toBe(401);
        });
        it("should handle product not found", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get(`/products/${productId + "000_xxx"}`)
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(404);
        });
    });
});
