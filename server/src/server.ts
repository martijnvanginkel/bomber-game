import express from 'express'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import { disconnectFromGame, findGame, Game } from './game'
import { getRandomClientID } from './utils/randomClientID'
import { LocationType } from './sockets/types'

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
    // io.to(game.ID).emit('connected', clientID)
    socket.emit('connected', clientID)
    // socket.to(game.ID).emit('client', clientID)

    socket.on('client', (ID: number) => {
        console.log('received ID: ', ID)
    })

    // socket.broadcast.to(game.ID).emit('move', ID, location)
    // socket.to(game.ID).emit('connected', clientID)
    // socket.on('client', (ID: number) => {
    //     console.log(ID)
    // })

    game.join(clientID, (gameID: string, clients: number[]) => {
        // console.log(clientID)
        io.to(game.ID).emit('startGame', {
            gameID,
            clients,
            clientID,
        })
    })

    // console.log(clientID)

    game.on('full', () => {
        // console.log('client id ', clientID)
        // console.log()
    })

    socket.on('finished', () => {
        disconnectFromGame(game, clientID)
    })

    socket.on('disconnecting', () => {
        console.log('on disconnect')
        disconnectFromGame(game, clientID)
        io.to(game.ID).emit('lost')
    })

    // in-game
    socket.on('move', (ID: number, location: LocationType) => {
        socket.broadcast.to(game.ID).emit('move', ID, location)
    })
})

server.listen(80, () => console.log('backend running on port 80'))
