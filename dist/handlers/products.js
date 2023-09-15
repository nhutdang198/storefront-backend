"use strict";
// handlers/product.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductsByCategory = exports.getTopPopularProducts = exports.createProduct = exports.getProductById = exports.getAllProducts = void 0;
const products_1 = __importDefault(require("../models/products"));
/**
 * Get a list of all products.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getAllProducts(req, res) {
    try {
        const products = await products_1.default.getAllProducts();
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getAllProducts = getAllProducts;
/**
 * Get details of a specific product by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getProductById(req, res) {
    try {
        const productId = parseInt(req.params.productId, 10);
        const product = await products_1.default.getProductById(productId);
        if (product) {
            res.status(200).json(product);
        }
        else {
            res.status(404).json({ message: 'Product not found' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getProductById = getProductById;
/**
 * Create a new product.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createProduct(req, res) {
    try {
        const { name, price, category } = req.body;
        const productId = await products_1.default.createProduct(name, price, category);
        if (productId !== null) {
            res.status(201).json({ productId });
        }
        else {
            res.status(500).json({ message: 'Failed to create product' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.createProduct = createProduct;
/**
 * Get the top 5 most popular products.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getTopPopularProducts(req, res) {
    try {
        const topProducts = await products_1.default.getTopPopularProducts();
        res.status(200).json(topProducts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getTopPopularProducts = getTopPopularProducts;
/**
 * Get products by category.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getProductsByCategory(req, res) {
    try {
        const category = req.params.category;
        const products = await products_1.default.getProductsByCategory(category);
        res.status(200).json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.getProductsByCategory = getProductsByCategory;
/**
 * Update product details by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function updateProduct(req, res) {
    try {
        const productId = parseInt(req.params.productId, 10);
        const updatedProductData = req.body;
        const result = await products_1.default.updateProduct(productId, updatedProductData);
        res.status(200).json(result.rows[0]);
    }
    catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.updateProduct = updateProduct;
/**
 * Delete product by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function deleteProduct(req, res) {
    try {
        const productId = parseInt(req.params.productId, 10);
        const result = await products_1.default.deleteProduct(productId);
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Product not found' });
        }
        else {
            res.status(204).end();
        }
    }
    catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
exports.deleteProduct = deleteProduct;
