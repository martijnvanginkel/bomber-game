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
  console.log('new websocket')
})

server.listen(80, () => console.log('connected'));