"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../models/users");
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        const user = await users_1.User.getUserByUsername(username);
        let isMatch = false;
        if (user) {
            const match = await bcrypt_1.default.compare(password, user.password);
            if (match) {
                isMatch = true;
            }
        }
        if (isMatch) {
            const token = jsonwebtoken_1.default.sign({ userId: user?.id }, process.env.TOKEN_SECRET, { expiresIn: "7d" });
            res.status(200).json({ token });
        }
        else {
            res.status(400).json({ message: "invalid username or password" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
exports.loginUser = loginUser;
