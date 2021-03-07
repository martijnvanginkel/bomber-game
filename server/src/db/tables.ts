// const pg = require('pg')

// const pool = new pg.Pool({
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     database: process.env.DB_NAME,
//     max: 5,
//     connectionTimeoutMillis: 0,
//     idleTimeoutMillis: 0,
// })

const { Client } = require('pg')

const createGamesTable = async () => {
    const tableName = 'games'
    try {
        const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
        })
        await client.connect()
        await client.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`)
        await client.query(`CREATE TABLE ${tableName}(
            ID INT GENERATED ALWAYS AS IDENTITY,
            game_id varchar
            );`)
        await client.end()
    } catch (error) {
        console.log(`${error}`)
    }
}
// createGamesTable()

const insertGameRow = async () => {
    const tableName = 'games'
    try {
        const client = new Client({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_NAME,
        })
        await client.connect()
        const randomString = Math.random().toString(36).substr(2, 8).toString()
        const query = {
            text: `INSERT INTO ${tableName}(game_id) VALUES($1)`,
            values: [randomString],
        }
        await client.query(query)
        await client.end()
    } catch (error) {
        console.log(`${error}`)
    }
}
insertGameRow()
console.log('done')
