// handlers/order.ts

import { Request, Response } from 'express';
import Order from '../models/orders';

/**
 * Create a new order.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createOrder(req: Request, res: Response): Promise<void> {
  try {
    const { productIds, quantities, userId, status } = req.body;
    const orderId = await Order.createOrder(productIds, quantities, userId, status);

    if (orderId !== null) {
      res.status(201).json({ orderId });
    } else {
      res.status(500).json({ message: 'Failed to create order' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Get the current order by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getCurrentOrderByUser(req: Request, res: Response): Promise<void> {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const currentOrder = await Order.getCurrentOrderByUser(userId);

    if (currentOrder) {
      res.status(200).json(currentOrder);
    } else {
      res.status(404).json({ message: 'Current order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

/**
 * Get completed orders by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getCompletedOrdersByUser(req: Request, res: Response): Promise<void> {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const completedOrders = await Order.getCompletedOrdersByUser(userId);

    res.status(200).json(completedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { createOrder, getCurrentOrderByUser, getCompletedOrdersByUser };
