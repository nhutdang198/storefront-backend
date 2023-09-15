"use strict";
// routes/orders.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderHandlers = __importStar(require("../handlers/orders"));
const loggedInGuard_1 = require("../middlewares/loggedInGuard");
const router = express_1.default.Router();
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
router.post("/", loggedInGuard_1.loggedInGuard, orderHandlers.createOrder);
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
router.get("/current/:userId", loggedInGuard_1.loggedInGuard, orderHandlers.getCurrentOrderByUser);
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
router.get("/completed/:userId", loggedInGuard_1.loggedInGuard, orderHandlers.getCompletedOrdersByUser);
exports.default = router;
