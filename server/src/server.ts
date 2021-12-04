import express from 'express'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import { disconnectFromGame, findGame, Game } from './game'
import { getRandomClientID } from './utils/randomClientID'
import { Direction, LocationType } from './sockets/types'

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
    socket.emit('connected', clientID)

    socket.on('clientConnected', (ID: number) => {
        game.join(ID)
    })

    game.on('full', (gameID: string, clients: number[]) => {
        socket.to(game.ID).emit('startGame', gameID, clients)
    })

    socket.on('finished', () => {
        disconnectFromGame(game, clientID)
    })

    socket.on('disconnecting', () => {
        disconnectFromGame(game, clientID)
        io.to(game.ID).emit('lost')
    })

    // in-game
    socket.on('move', (ID: number, location: LocationType) => {
        socket.broadcast.to(game.ID).emit('move', ID, location)
    })

    socket.on('bounce', (victimID: number, direction: Direction, multiplier?: number) => {
        socket.broadcast.to(game.ID).emit('bounce', victimID, direction, multiplier)
    })

    socket.on('gameEnded', () => {
        console.log('gameEnded')
        io.to(game.ID).emit('gameEnded')
    })
})

server.listen(80, () => console.log('backend running on port 80'))
