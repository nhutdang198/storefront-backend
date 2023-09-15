"use strict";
// spec/routes/users.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../../src/server");
describe("User Routes", () => {
    let authToken; // JWT token for authentication (obtained during login)
    let userId;
    beforeAll(async () => {
        const newUser = await (0, supertest_1.default)(server_1.app).post("/users").send({
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
            const response = await (0, supertest_1.default)(server_1.app)
                .get("/users")
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
        });
        it("should require authentication", async () => {
            const response = await (0, supertest_1.default)(server_1.app).get("/users");
            expect(response.status).toBe(401);
        });
    });
    describe("GET /users/:userId", () => {
        it("should return user details by ID", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get(`/users/${userId}`)
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(200);
        });
        it("should require authentication", async () => {
            const response = await (0, supertest_1.default)(server_1.app).get(`/users/${userId}`);
            expect(response.status).toBe(401);
        });
        it("should handle user not found", async () => {
            const response = await (0, supertest_1.default)(server_1.app)
                .get(`/users/${userId + "000_xxx"}`)
                .set("Authorization", `Bearer ${authToken}`);
            expect(response.status).toBe(404);
        });
    });
});
