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


io.on('connection', socket => {
  const ID = uniqueId()
  io.emit('connected', ID)
  socket.on('shareMyID', (data) => socket.broadcast.emit('incomingID', data))
  socket.on('lastIncomingID', (data) => socket.broadcast.emit('lastIncomingID', data))
  socket.on('disconnect', function () {
    io.emit('playerLeft', ID)
  })

})

server.listen(80, () => undefined);