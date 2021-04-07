import express from 'express'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import { disconnectFromGame, findGame, Game } from './game'
import { getRandomClientID } from './utils/randomClientID'

const app = express()
const publicPath = path.resolve(__dirname + '/../../client/dist/')
const server = http.createServer(app)
const io = require('socket.io')(server)

dotenv.config()

app.use(express.static(publicPath))
app.get('/', function (req: any, res: any) {
    res.sendFile(publicPath + 'index.html')
})

io.on('connection', (socket: any) => {
    const game: Game = findGame()
    const clientID: number = getRandomClientID()

    socket.join(game.ID)
    io.to(game.ID).emit('connected')

    game.join(clientID, (gameID: string, clients: number[]) => {
        io.to(game.ID).emit('startGame', {
            gameID,
            clients,
            clientID,
        })
    })

    socket.on('finished', () => {
        disconnectFromGame(game, clientID)
    })

    socket.on('disconnecting', () => {
        console.log('on disconnect')
        disconnectFromGame(game, clientID)
        io.to(game.ID).emit('lost')
    })
})

server.listen(80, () => console.log('backend running on port 80'))
