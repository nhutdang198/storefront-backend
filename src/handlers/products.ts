// handlers/product.ts

import { Request, Response } from 'express';
import Product from '../models/products';

/**
 * Get a list of all products.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getAllProducts(req: Request, res: Response): Promise<void> {
  try {
    const products = await Product.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Get details of a specific product by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getProductById(req: Request, res: Response): Promise<void> {
  try {
    const productId: number = parseInt(req.params.productId, 10);
    const product = await Product.getProductById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Create a new product.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createProduct(req: Request, res: Response): Promise<void> {
  try {
    const { name, price, category } = req.body;
    const productId = await Product.createProduct(name, price, category);

    if (productId !== null) {
      res.status(201).json({ productId });
    } else {
      res.status(500).json({ message: 'Failed to create product' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Get the top 5 most popular products.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getTopPopularProducts(req: Request, res: Response): Promise<void> {
  try {
    const topProducts = await Product.getTopPopularProducts();
    res.status(200).json(topProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Get products by category.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getProductsByCategory(req: Request, res: Response): Promise<void> {
  try {
    const category: string = req.params.category;
    const products = await Product.getProductsByCategory(category);
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Update product details by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function updateProduct(req: Request, res: Response): Promise<void> {
  try {
    const productId: number = parseInt(req.params.productId, 10);
    const updatedProductData = req.body;
    const result = await Product.updateProduct(productId, updatedProductData);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

/**
 * Delete product by ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function deleteProduct(req: Request, res: Response): Promise<void> {
  try {
    const productId: number = parseInt(req.params.productId, 10);
    const result = await Product.deleteProduct(productId);
    if (result.rowCount === 0) {
      res.status(404).json({ error: 'Product not found' });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


export { getAllProducts, getProductById, createProduct, getTopPopularProducts, getProductsByCategory, updateProduct, deleteProduct };
