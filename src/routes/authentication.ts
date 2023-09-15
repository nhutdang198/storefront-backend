// routes/users.ts

import express from 'express';
import {
  loginUser
} from '../handlers/authentication';

const router = express.Router();

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
router.post('/login', loginUser);

export default router;
