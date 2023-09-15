"use strict";
// handlers/users.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUserOrders = exports.getCompletedUserOrders = exports.getUsers = exports.createUser = exports.getUserById = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Get a user by their ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getUserById(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const user = await users_1.User.getUserById(userId);
        if (user) {
            res.status(200).json(user);
        }
        else {
            res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.getUserById = getUserById;
/**
 * Create a new user.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createUser(req, res) {
    try {
        const { firstName, lastName, username, password } = req.body;
        const userId = await users_1.User.createUser(firstName, lastName, username, password);
        const token = jsonwebtoken_1.default.sign({ userId: userId }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
        if (userId !== null) {
            res.status(201).json({ userId, token });
        }
        else {
            res.status(500).json({ message: "Failed to create user" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.createUser = createUser;
async function getUsers(req, res) {
    try {
        const result = await users_1.User.getUsers();
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.getUsers = getUsers;
/**
 * Get the current user's orders by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function getCurrentUserOrders(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = await users_1.User.getCurrentUserOrders(userId);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error fetching current user orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.getCurrentUserOrders = getCurrentUserOrders;
/**
 * Get completed orders by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 */
async function getCompletedUserOrders(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const result = await users_1.User.getCompletedUserOrders(userId);
        res.status(200).json(result.rows);
    }
    catch (error) {
        console.error("Error fetching completed user orders:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
exports.getCompletedUserOrders = getCompletedUserOrders;
