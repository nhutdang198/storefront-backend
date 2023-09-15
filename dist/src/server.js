"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const users_1 = __importDefault(require("./routes/users"));
const products_1 = __importDefault(require("./routes/products"));
const orders_1 = __importDefault(require("./routes/orders"));
require("dotenv/config");
const authentication_1 = __importDefault(require("./routes/authentication"));
exports.app = (0, express_1.default)();
exports.app.use(body_parser_1.default.json());
exports.app.use((request, response, next) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const time = `[${year}/${month}/${day} ${hour}:${minute}:${second}]`;
    console.log(time + ' ' + request.method + ' ' + request.url);
    next();
});
exports.app.use('/users', users_1.default);
exports.app.use('/products', products_1.default);
exports.app.use('/orders', orders_1.default);
exports.app.use('/authentications', authentication_1.default);
const { PORT } = process.env;
exports.app.listen(PORT, function () {
    console.log(`starting app on: ${PORT}`);
});
