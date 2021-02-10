import express from 'express'
import path from 'path'
import http from 'http'
import socketIo from 'socket.io'
import uniqueId from 'lodash.uniqueid'
import { Ability, BounceData, ClientInfo, ShareLocationType } from './sockets/types'

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const publicPath = path.resolve(__dirname + '/../../client/dist/')

app.use(express.static(publicPath))
app.get('/', function (req: any, res: any) {
    res.sendFile(publicPath + 'index.html')
})

let clients: any = []

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

// import dotenv from 'dotenv'
// import express from 'express'
// import path from 'path'

// // load the environment variables from the .env file
// dotenv.config({
//     path: '.env',
// })

// /**
//  * Express server application class.
//  * @description Will later contain the routing system.
//  */
// class Server {
//     public app = express()
// }

// // initialize server app
// const server = new Server()

// server.app.get('/', function (req: express.Request, res: express.Response) {
//     res.sendFile(path.resolve(__dirname, './../../client/dist/index.html'))
// })

// // make server listen on some port
// ;((port = process.env.APP_PORT || 5000) => {
//     server.app.listen(port, () => console.log(`> Listening on port ${port}`))
// })()
