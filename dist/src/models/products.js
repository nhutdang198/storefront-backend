"use strict";
// models/product.model.ts
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
/**
 * Represents a Product in the database.
 */
class Product {
    /**
     * Create a new product.
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     * @param {string} category - The category of the product (optional).
     * @returns {Promise<number | null>} The ID of the newly created product or null on error.
     */
    static async createProduct(name, price, category) {
        const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING id';
        const values = [name, price, category || null];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows[0]?.id || null;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get a product by its ID.
     * @param {number} productId - The ID of the product to retrieve.
     * @returns {Promise<Product | null>} The product object or null if not found.
     */
    static async getProductById(productId) {
        const query = 'SELECT * FROM products WHERE id = $1';
        const values = [productId];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows[0] || null;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get the top 5 most popular products.
     * @returns {Promise<Product[]>} An array of the top 5 most popular products.
     */
    static async getTopPopularProducts() {
        const query = 'SELECT * FROM products ORDER BY popularity DESC LIMIT 5';
        try {
            const result = await database_1.client.query(query);
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get products by category.
     * @param {string} category - The category name to filter by.
     * @returns {Promise<Product[]>} An array of products in the specified category.
     */
    static async getProductsByCategory(category) {
        const query = 'SELECT * FROM products WHERE category = $1';
        const values = [category];
        try {
            const result = await database_1.client.query(query, values);
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Get a list of all products.
     * @returns {Promise<Product[]>} An array of all products.
     */
    static async getAllProducts() {
        const query = 'SELECT * FROM products';
        try {
            const result = await database_1.client.query(query);
            return result.rows;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Update product details by ID.
     * @param {number} productId - The ID of the product to update.
     * @param {object} updatedProductData - The updated product data.
     * @returns {Promise<QueryResult>} A Promise that resolves with the query result.
     */
    static async updateProduct(productId, updatedProductData) {
        try {
            // Query to update product details in the database
            const query = 'UPDATE products SET name = $1, price = $2, category = $3 WHERE id = $4 RETURNING *';
            const values = [updatedProductData.name, updatedProductData.price, updatedProductData.category, productId];
            const result = await database_1.client.query(query, values);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
    /**
     * Delete product by ID.
     * @param {number} productId - The ID of the product to delete.
     * @returns {Promise<QueryResult>} A Promise that resolves with the query result.
     */
    static async deleteProduct(productId) {
        try {
            // Query to delete a product from the database
            const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
            const values = [productId];
            const result = await database_1.client.query(query, values);
            return result;
        }
        catch (error) {
            throw error;
        }
    }
}
exports.default = Product;
