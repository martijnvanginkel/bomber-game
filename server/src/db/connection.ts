import { Pool } from 'pg'

export const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    max: 5,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
})

// module.exports = { pool }