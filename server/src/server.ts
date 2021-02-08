// import express from 'express'
// const express = require('express')
// import http from 'http'
// import path from 'path'
// import io from 'socket.io-client'
// import uniqueId from 'lodash.uniqueid'

var express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const server = http.createServer(app)
// import io from 'socket.io'
// const io = require('socket.io')(server)
const uniqueId = require('lodash.uniqueid')

const socketIo = require('socket.io')

const io = socketIo(server)

// const io = io

// const myIo = io(server)

const htmlPath = path.resolve(__dirname + '/../../client/dist/index.html')

// app.use(express.static(path.resolve(__dirname + '/../../client')))
app.use(express.static(path.resolve(__dirname + '/../../client/dist')))
app.get('/', function (req: any, res: any) {
    res.sendFile(htmlPath)
})

let clients: any = []

io.on('connection', (socket: any) => {
    console.log('connect')
    // registering connections
    const ID = uniqueId()
    clients.push(ID)
    socket.emit('connected', { ID: ID, index: clients.length }) // io.emit on bug?
    socket.on('shareClient', (data: any) => socket.broadcast.emit('incomingClient', data))
    socket.on('secondShareClient', (data: any) => socket.broadcast.emit('secondIncomingClient', data))

    socket.on('disconnect', function () {
        io.emit('playerLeft', ID)
        clients = clients.filter((cl: any) => cl !== ID)
    })

    socket.on('shareLocation', (data: any) => {
        socket.broadcast.emit('incomingLocation', data)
    })

    socket.on('shareAbility', (data: any) => {
        socket.broadcast.emit('incomingAbility', data)
    })

    socket.on('shareBounce', (data: any) => {
        socket.broadcast.emit('incomingBounce', data)
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
