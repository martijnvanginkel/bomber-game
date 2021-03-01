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

const createGamesTable = async () => {
    const tableName = 'games'
    try {
        await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`)
        await pool.query(`CREATE TABLE ${tableName}(
            ID INT GENERATED ALWAYS AS IDENTITY,
            game_id varchar
         );`)
    } catch (error) {
        console.log(`${error}`)
    }
    pool.end()
    // pool.close
}
createGamesTable()
console.log('done')
