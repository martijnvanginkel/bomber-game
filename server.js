var express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
// const serverSockets = require('./serverSockets')
const io = require('socket.io')(server)
const uniqueId = require('lodash.uniqueid');

app.use(express.static(__dirname + '/dist/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

let clients = []

io.on('connection', socket => {
  // registering connections
  const ID = uniqueId()
  clients.push(ID)
  socket.emit('connected', { ID: ID, index: clients.length }) // io.emit on bug?
  socket.on('shareClient', (data) => socket.broadcast.emit('incomingClient', data))
  socket.on('secondShareClient', (data) => socket.broadcast.emit('secondIncomingClient', data))

  socket.on('disconnect', function () {
    io.emit('playerLeft', ID)
    clients = clients.filter((cl) => cl !== ID)
  })


  socket.on('shareLocation', (data) => {
    socket.broadcast.emit('incomingLocation', data)
  })



})

server.listen(80, () => undefined);