"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const { PG_DEV_HOST, PG_DEV_DATABASE, PG_DEV_USER, PG_DEV_PASSWORD, } = process.env;
exports.client = new pg_1.Pool({
    host: PG_DEV_HOST,
    database: PG_DEV_DATABASE,
    user: PG_DEV_USER,
    password: PG_DEV_PASSWORD,
});
