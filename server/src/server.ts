import express from 'express'
import path from 'path'
import http from 'http'
import dotenv from 'dotenv'
import { disconnectFromGame, Game, joinGame } from './game'

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
    const game: Game = joinGame()
    socket.join(game.ID)
    io.to(game.ID).emit('connected', game.ID)

    // io.to(game.ID).emit('connected', game.ID)

    // console.log(games)

    socket.on('disconnecting', () => {
        console.log('on disconnect')
        disconnectFromGame(game)
    })

    // const ID = uniqueId()
    // clients.push(ID)
    // const clientInfo: ClientInfo = {
    //     ID: ID,
    //     index: clients.length,
    // }
    // io.emit('connected')
    // socket.emit('connected', 'adf')
    // socket.on('shareClient', (clientInfo: ClientInfo) => socket.broadcast.emit('incomingClient', clientInfo))
    // socket.on('secondShareClient', (clientInfo: ClientInfo) =>
    //     socket.broadcast.emit('secondIncomingClient', clientInfo),
    // )
    // socket.on('disconnect', function () {
    //     io.emit('playerLeft', ID)
    //     clients = clients.filter((cl: any) => cl !== ID)
    // })
    // socket.on('shareLocation', (incomingLocation: ShareLocationType) => {
    //     socket.broadcast.emit('incomingLocation', incomingLocation)
    // })
    // socket.on('shareAbility', (ability: Ability) => {
    //     socket.broadcast.emit('incomingAbility', ability)
    // })
    // socket.on('shareBounce', (bounce: BounceData) => {
    //     socket.broadcast.emit('incomingBounce', bounce)
    // })
})

server.listen(80, () => console.log('backend running on port 80'))
