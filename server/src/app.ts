import dotenv from 'dotenv'
import express from 'express'
import path from 'path'

// load the environment variables from the .env file
dotenv.config({
    path: '.env',
})

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
    public app = express()
}

// initialize server app
const server = new Server()

server.app.get('/', function (req: express.Request, res: express.Response) {
    res.sendFile(path.resolve(__dirname, './../../dist/index.html'))
})

// make server listen on some port
;((port = process.env.APP_PORT || 5000) => {
    server.app.listen(port, () => console.log(`> Listening on port ${port}`))
})()
