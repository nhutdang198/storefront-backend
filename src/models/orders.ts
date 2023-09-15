// models/order.model.ts

import { client } from "../database";

/**
 * Represents an Order in the database.
 */
class Order {
  /**
   * Create a new order.
   * @param {number[]} productIds - An array of product IDs included in the order.
   * @param {number[]} quantities - An array of quantities corresponding to each product.
   * @param {number} userId - The ID of the user placing the order.
   * @param {string} status - The status of the order (e.g., 'active' or 'complete').
   * @returns {Promise<number>} The ID of the newly created order.
   */
  static async createOrder(productIds: number[], quantities: number[], userId: number, status: string): Promise<number> {
    const query = 'INSERT INTO orders (product_ids, quantities, user_id, status) VALUES ($1, $2, $3, $4) RETURNING id';
    const values = [productIds, quantities, userId, status];

    try {
      const result = await client.query(query, values);
      return result.rows[0].id;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get the current order by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<Order | null>} The current order for the user or null if not found.
   */
  static async getCurrentOrderByUser(userId: number): Promise<Order | null> {
    const query = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
    const values = [userId, 'active'];

    try {
      const result = await client.query(query, values);
      return result.rows[0] || null;
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
    const query = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2';
    const values = [userId, 'complete'];

    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default Order;
