// import { pool } from './connection'
// const pool = require('./pool')
// import { Pool } from 'pg'
const pg = require('pg')

const pool = new pg.Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    max: 5,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
})

// const pool = require('./connection')

const createGamesTable = async () => {
    const tableName = 'games'
    const query = `
        id SERIAL PRIMARY KEY,
        game_id uuid DEFAULT uuid_generate_v4 (),
    `

    try {
        // await pool.query(`DROP TABLE IF EXISTS ${'asdf'} CASCADE`)
        await pool.query(`CREATE TABLE roles(
            role_id serial PRIMARY KEY,
            role_name VARCHAR (255) UNIQUE NOT NULL
         );`)
        //  console.log()
    } catch (error) {
        console.log(`${error}`)
    }
}
// console.log('asdf')
createGamesTable()
// return
