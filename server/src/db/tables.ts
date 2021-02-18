import { pool } from './connection'

const createGamesTable = async () => {
    const tableName = 'games'
    const query = `
        id SERIAL PRIMARY KEY,
        game_id uuid DEFAULT uuid_generate_v4 (), 
    `

    try {
        await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`)
        await pool.query(`CREATE TABLE ${tableName} (${query});`)
    } catch (error) {
        console.log(`${error}`)
    }
}
