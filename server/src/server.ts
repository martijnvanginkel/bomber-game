import express from 'express'
import path from 'path'
import http from 'http'
import socketIo from 'socket.io'
import uniqueId from 'lodash.uniqueid'
import dotenv from 'dotenv'
import { Ability, BounceData, ClientInfo, ShareLocationType } from './sockets/types'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)
dotenv.config()

const publicPath = path.resolve(__dirname + '/../../client/dist/')

app.use(express.static(publicPath))
app.get('/', function (req: any, res: any) {
    res.sendFile(publicPath + 'index.html')
})

let clients: string[] = []

io.on('connection', (socket: any) => {
    console.log('connect')
    const ID = uniqueId()
    clients.push(ID)
    const clientInfo: ClientInfo = {
        ID: ID,
        index: clients.length,
    }
    socket.emit('connected', clientInfo)
    socket.on('shareClient', (clientInfo: ClientInfo) => socket.broadcast.emit('incomingClient', clientInfo))
    socket.on('secondShareClient', (clientInfo: ClientInfo) =>
        socket.broadcast.emit('secondIncomingClient', clientInfo),
    )

    socket.on('disconnect', function () {
        io.emit('playerLeft', ID)
        clients = clients.filter((cl: any) => cl !== ID)
    })

    socket.on('shareLocation', (incomingLocation: ShareLocationType) => {
        socket.broadcast.emit('incomingLocation', incomingLocation)
    })

    socket.on('shareAbility', (ability: Ability) => {
        socket.broadcast.emit('incomingAbility', ability)
    })

    socket.on('shareBounce', (bounce: BounceData) => {
        socket.broadcast.emit('incomingBounce', bounce)
    })
})

server.listen(9000, () => console.log('backend running on port 9000'))
