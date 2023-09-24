"use strict";
// models/product.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
/**
 * Represents a order product in the database.
 */
class OrderProductMap {
    /**
     * create
     * @param {number} orderId - The ID of the order.
     * @param {number} productId - The ID of the product.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<OrderProductMap>} The current order mapper is currently created.
     */
    static async createOrderMapper(orderId, productId, userId) {
        const query = "INSERT INTO order_products (order_id, product_id, user_id) VALUES ($1, $2, $3) RETURNING order_id";
        const values = [orderId, productId, userId];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            throw error;
        }
    }
    static async getOrderMapperByUserId(userId) {
        const query = "SELECT * FROM order_products where user_id = $1";
        const values = [userId];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = OrderProductMap;
