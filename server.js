var express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server)
const uniqueId = require('lodash.uniqueid');

app.use(express.static(__dirname + '/dist/'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});


io.on('connection', socket => {

  const ID = uniqueId()
  socket.broadcast.emit('player_connected', ID)
  // io.sockets.emit('player_connected')
})

server.listen(80, () => console.log('connected'));