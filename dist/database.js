"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
require("dotenv/config");
const pg_1 = require("pg");
const { PG_DEV_HOST, PG_DEV_DATABASE, PG_DEV_USER, PG_DEV_PASSWORD, PG_TEST_HOST, PG_TEST_DATABASE, PG_TEST_USER, PG_TEST_PASSWORD, NODE_ENV, } = process.env;
let PG_HOST = PG_TEST_HOST;
let PG_DATABASE = PG_TEST_DATABASE;
let PG_USER = PG_TEST_USER;
let PG_PASSWORD = PG_TEST_PASSWORD;
if (NODE_ENV === "test") {
    PG_HOST = PG_TEST_HOST;
    PG_DATABASE = PG_TEST_DATABASE;
    PG_USER = PG_TEST_USER;
    PG_PASSWORD = PG_TEST_PASSWORD;
}
if (NODE_ENV === "dev") {
    PG_HOST = PG_DEV_HOST;
    PG_DATABASE = PG_DEV_DATABASE;
    PG_USER = PG_DEV_USER;
    PG_PASSWORD = PG_DEV_PASSWORD;
}
exports.client = new pg_1.Pool({
    host: PG_HOST,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD,
});
