"use strict";
// models/order.model.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const order_product_map_1 = __importDefault(require("./order-product-map"));
/**
 * Represents an Order in the database.
 */
class Order {
    /**
     * Create a new order.
     * @param {number[]} productId - A product ID included in the order.
     * @param {number[]} quantity - An quantity corresponding to product.
     * @param {number} userId - The ID of the user placing the order.
     * @param {string} status - The status of the order (e.g., 'active' or 'complete').
     * @returns {Promise<number>} The ID of the newly created order.
     */
    static async createOrder(productId, quantity, userId, status = "active") {
        const query = "INSERT INTO orders (quantity, status) VALUES ($1, $2) RETURNING id";
        const values = [quantity, status];
        try {
            const result = await database_1.client.query(query, values);
            const orderId = result.rows[0].id;
            await order_product_map_1.default.createOrderMapper(orderId, productId, userId);
            return orderId;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get the current order by user ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Order | null>} The current order for the user or null if not found.
     */
    static async getCurrentOrderByUser(userId) {
        const query = `
    SELECT orders.id AS order_id, 
       products.name AS product_name, 
       orders.quantity AS quantity,
       orders.status AS order_status
    FROM orders
    JOIN order_products ON orders.id = order_products.order_id
    JOIN products ON order_products.product_id = products.id
    JOIN users ON order_products.user_id = users.id
    WHERE users.id = $1 
      AND orders.status = 'active'`;
        const values = [userId];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get completed orders by user ID.
     * @param {number} userId - The ID of the user.
     * @returns {Promise<Order[]>} An array of completed orders for the user.
     */
    static async getCompletedOrdersByUser(userId) {
        const query = `
    SELECT orders.id AS order_id, 
       products.name AS product_name, 
       orders.quantity AS quantity,
       orders.status AS order_status
    FROM orders
    JOIN order_products ON orders.id = order_products.order_id
    JOIN products ON order_products.product_id = products.id
    JOIN users ON order_products.user_id = users.id
    WHERE users.id = $1 
      AND orders.status = 'complete'`;
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
exports.default = Order;
