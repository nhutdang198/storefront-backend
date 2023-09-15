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
    var _a, _b, _c;
    const token = ((_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) ||
        ((_b = req === null || req === void 0 ? void 0 : req.headers) === null || _b === void 0 ? void 0 : _b.Authorization) ||
        "";
    if (!token) {
        res.status(401).json({ message: "unauthorized" });
        return;
    }
    const jwtDecode = jsonwebtoken_1.default.decode((_c = token === null || token === void 0 ? void 0 : token.split(" ")) === null || _c === void 0 ? void 0 : _c[1]);
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
