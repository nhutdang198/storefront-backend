// routes/orders.ts

import express from "express";
import * as orderHandlers from "../handlers/orders";
import { loggedInGuard } from "../middlewares/loggedInGuard";

const router = express.Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order.
 *     description: Create a new order.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: The newly created order.
 */
router.post("/", loggedInGuard, orderHandlers.createOrder);

/**
 * @swagger
 * /orders/current/{userId}:
 *   get:
 *     summary: Get the current order for a user.
 *     description: Retrieve the current order for a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve the current order for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The current order for the user.
 */
router.get(
  "/current/:userId",
  loggedInGuard,
  orderHandlers.getCurrentOrderByUser
);

/**
 * @swagger
 * /orders/completed/{userId}:
 *   get:
 *     summary: Get completed orders by user.
 *     description: Retrieve completed orders for a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve completed orders for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of completed orders for the user.
 */
router.get(
  "/completed/:userId",
  loggedInGuard,
  orderHandlers.getCompletedOrdersByUser
);

export default router;
