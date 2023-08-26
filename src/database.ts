import { Pool } from 'pg'

const { PG_DEV_HOST,
    PG_DEV_DATABASE,
    PG_DEV_USER,
    PG_DEV_PASSWORD,
} = process.env

export const client = new Pool({
    host: PG_DEV_HOST,
    database: PG_DEV_DATABASE,
    user: PG_DEV_USER,
    password: PG_DEV_PASSWORD
})