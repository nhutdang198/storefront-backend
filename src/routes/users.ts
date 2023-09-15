// routes/users.ts

import express from "express";
import {
  getUserById,
  createUser,
  getUsers,
  getCurrentUserOrders,
  getCompletedUserOrders,
} from "../handlers/users";
import { loggedInGuard } from "../middlewares/loggedInGuard";

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/", loggedInGuard, getUsers);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user.
 *     description: Create a new user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *             required:
 *               - firstName
 *               - lastName
 *               - password
 *     responses:
 *       201:
 *         description: The newly created user.
 */
router.route("/").post(createUser);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user details by ID.
 *     description: Retrieve user details by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details.
 *   parameters:
 *     - in: path
 *       name: userId
 *       required: rtue
 *       description: The ID of the user to retrieve.
 *       schema:
 *         type: integer
 */
router.get("/:userId", loggedInGuard, getUserById);

/**
 * @swagger
 * /users/{userId}/orders/current:
 *   get:
 *     summary: Get the current user's orders by user ID.
 *     description: Retrieve the current user's orders by their user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve orders for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of the user's current orders.
 */
router.get("/:userId/orders/current", loggedInGuard, getCurrentUserOrders);

/**
 * @swagger
 * /users/{userId}/orders/completed:
 *   get:
 *     summary: Get completed orders by user ID.
 *     description: Retrieve completed orders by user ID.
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
router.get("/:userId/orders/completed", loggedInGuard, getCompletedUserOrders);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get a list of all users.
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: A list of users.
 */
router.get("/", loggedInGuard, getUsers);

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user details by ID.
 *     description: Retrieve user details by their ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User details.
 */
router.get("/:userId", loggedInGuard, getCurrentUserOrders);

/**
 * @swagger
 * /users/{userId}/orders/current:
 *   get:
 *     summary: Get the current user's orders by user ID.
 *     description: Retrieve the current user's orders by their user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve orders for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of the user's current orders.
 */
router.get("/:userId/orders/current", loggedInGuard, getCompletedUserOrders);

/**
 * @swagger
 * /users/{userId}/orders/completed:
 *   get:
 *     summary: Get completed orders by user ID.
 *     description: Retrieve completed orders by user ID.
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
router.get("/:userId/orders/completed", loggedInGuard, getCompletedUserOrders);

export default router;
