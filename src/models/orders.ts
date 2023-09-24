// models/order.model.ts

import { client } from "../database";
import OrderProductMap from "./order-product-map";

/**
 * Represents an Order in the database.
 */
class Order {
  id?: number;
  quantity?: number;
  status?: string;

  /**
   * Create a new order.
   * @param {number[]} productId - A product ID included in the order.
   * @param {number[]} quantity - An quantity corresponding to product.
   * @param {number} userId - The ID of the user placing the order.
   * @param {string} status - The status of the order (e.g., 'active' or 'complete').
   * @returns {Promise<number>} The ID of the newly created order.
   */
  static async createOrder(
    productId: number,
    quantity: number,
    userId: number,
    status: string = "active"
  ): Promise<number> {
    const query =
      "INSERT INTO orders (quantity, status) VALUES ($1, $2) RETURNING id";
    const values = [quantity, status];
    try {
      const result = await client.query(query, values);
      const orderId = result.rows[0].id;
      await OrderProductMap.createOrderMapper(orderId, productId, userId);
      return orderId;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get the current order by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Order | null>} The current order for the user or null if not found.
   */
  static async getCurrentOrderByUser(userId: number): Promise<Order[]> {
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
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get completed orders by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Order[]>} An array of completed orders for the user.
   */
  static async getCompletedOrdersByUser(userId: number): Promise<Order[]> {
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
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Order;
