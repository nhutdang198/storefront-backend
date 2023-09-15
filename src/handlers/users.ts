// handlers/users.ts

import { Request, Response } from "express";
import { User } from "../models/users";
import jwt from "jsonwebtoken";

/**
 * Get a user by their ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getUserById(req: Request, res: Response): Promise<void> {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const user = await User.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * Create a new user.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createUser(req: Request, res: Response): Promise<void> {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = await User.createUser(
      firstName,
      lastName,
      username,
      password
    );
    const token = jwt.sign(
      { userId: userId },
      process.env.TOKEN_SECRET as string,
      { expiresIn: "7d" }
    );
    if (userId !== null) {
      res.status(201).json({ userId, token });
    } else {
      res.status(500).json({ message: "Failed to create user" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const result = await User.getUsers();
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Get the current user's orders by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function getCurrentUserOrders(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const result = await User.getCurrentUserOrders(userId);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching current user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * Get completed orders by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function getCompletedUserOrders(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const userId: number = parseInt(req.params.userId, 10);
    const result = await User.getCompletedUserOrders(userId);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching completed user orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  getUserById,
  createUser,
  getUsers,
  getCompletedUserOrders,
  getCurrentUserOrders,
};
