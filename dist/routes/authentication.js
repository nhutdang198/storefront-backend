"use strict";
// routes/users.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = require("../handlers/authentication");
const router = express_1.default.Router();
/**
 * @swagger
 * /authentications/login:
 *   get:
 *     summary: login user.
 *     description: login user by typing username and password
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The ID of the user to retrieve completed orders for.
 *         schema:
 *           type: string
 *       - in: path
 *         name: password
 *         required: true
 *         description: The ID of the user to retrieve completed orders for.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: a jwt token
 */
router.post('/login', authentication_1.loginUser);
exports.default = router;
