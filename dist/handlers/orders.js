"use strict";
// handlers/order.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompletedOrdersByUser = exports.getCurrentOrderByUser = exports.createOrder = void 0;
const orders_1 = __importDefault(require("../models/orders"));
/**
 * Create a new order.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function createOrder(req, res) {
    try {
        const { productId, quantity, userId, status } = req.body;
        const orderId = await orders_1.default.createOrder(productId, quantity, userId, status);
        if (orderId !== null) {
            res.status(201).json({ orderId });
        }
        else {
            res.status(500).json({ message: "Failed to create order" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.createOrder = createOrder;
/**
 * Get the current order by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getCurrentOrderByUser(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const currentOrder = await orders_1.default.getCurrentOrderByUser(userId);
        if (currentOrder) {
            res.status(200).json(currentOrder);
        }
        else {
            res.status(404).json({ message: "Current order not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.getCurrentOrderByUser = getCurrentOrderByUser;
/**
 * Get completed orders by user ID.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Promise<void>}
 */
async function getCompletedOrdersByUser(req, res) {
    try {
        const userId = parseInt(req.params.userId, 10);
        const completedOrders = await orders_1.default.getCompletedOrdersByUser(userId);
        res.status(200).json(completedOrders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.getCompletedOrdersByUser = getCompletedOrdersByUser;
