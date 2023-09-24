// models/product.model.ts

import { QueryResult } from "pg";
import { client } from "../database";

/**
 * Represents a order product in the database.
 */
class OrderProductMap {
  orderId?: string;
  productId?: string;
  userId?: string;

  /**
   * create 
   * @param {number} orderId - The ID of the order.
   * @param {number} productId - The ID of the product.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<OrderProductMap>} The current order mapper is currently created.
   */
  static async createOrderMapper(
    orderId: number,
    productId: number,
    userId: number
  ): Promise<OrderProductMap | null> {
    const query =
      "INSERT INTO order_products (order_id, product_id, user_id) VALUES ($1, $2, $3) RETURNING order_id";
    const values = [orderId, productId, userId];
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async getOrderMapperByUserId(
    userId: string
  ): Promise<OrderProductMap[]> {
    const query = "SELECT * FROM order_products where user_id = $1";
    const values = [userId];
    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

export default OrderProductMap;
