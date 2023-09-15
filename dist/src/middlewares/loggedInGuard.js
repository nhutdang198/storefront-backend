"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedInGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserGuardRequest extends Request {
}
async function loggedInGuard(req, res, next) {
    const token = req?.headers?.authorization ||
        req?.headers?.Authorization ||
        "";
    if (!token) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }
    const jwtDecode = jsonwebtoken_1.default.decode(token?.split(" ")?.[1]);
    if (!jwtDecode) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }
    const request = req;
    request.userId = jwtDecode;
    request.token = token;
    next();
}
exports.loggedInGuard = loggedInGuard;
