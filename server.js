var express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
// const socketio = require('socket.io')
// const io = require('socket.io')(httpServer)
const io = require('socket.io')(server)

// app.use(express.static(__dirname + '/node_modules/'));
app.use(express.static(__dirname + '/dist/'));
// app.use(express.static(__dirname + '/node_modules/'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});


io.on('connection', socket => {

  io.sockets.emit('player_connected')
  // io.sockets.emit('player_connected', 'asdfasdf');
  // io.broadcast.emit('player_connected', 'hoi')
  // io.sockets.
  // console.log('new websocket')
  // io.emit('connect', 'hello new player')
  // io.emit('tweet', tweet);
})

server.listen(80, () => console.log('connected'));

// run npm run dev-server to start project