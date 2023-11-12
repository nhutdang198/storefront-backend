"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("../handlers/products");
const loggedInGuard_1 = require("../middlewares/loggedInGuard");
const router = express_1.default.Router();
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get a list of all products.
 *     description: Retrieve a list of all products.
 *     responses:
 *       200:
 *         description: A list of products.
 */
router.get("/", products_1.getAllProducts);
/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     summary: Get product details by ID.
 *     description: Retrieve product details by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details.
 */
router.get("/:productId", loggedInGuard_1.loggedInGuard, products_1.getProductById);
/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product.
 *     description: Create a new product.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The newly created product.
 */
router.post("/", loggedInGuard_1.loggedInGuard, products_1.createProduct);
/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     summary: Update product details by ID.
 *     description: Update product details by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Updated product details.
 */
router.put("/:productId", loggedInGuard_1.loggedInGuard, products_1.updateProduct);
/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     summary: Delete product by ID.
 *     description: Delete product by its ID.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: The ID of the product to delete.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: No content (successful deletion).
 */
router.delete("/:productId", products_1.deleteProduct);
/**
 * @swagger
 * /products/category/{category}:
 *   get:
 *     summary: Get products by category.
 *     description: Retrieve products by a specific category.
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: The category name to filter products.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of products in the specified category.
 */
router.get("/category/:category", loggedInGuard_1.loggedInGuard, products_1.getProductsByCategory);
/**
 * @swagger
 * /products/popular:
 *   get:
 *     summary: Get the top popular products.
 *     description: Retrieve the top popular products.
 *     responses:
 *       200:
 *         description: A list of the top popular products.
 */
router.get("/popular", loggedInGuard_1.loggedInGuard, products_1.getTopPopularProducts);
exports.default = router;
