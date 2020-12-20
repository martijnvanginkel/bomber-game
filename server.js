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
  console.log('connected yeah')

  const ID = uniqueId()
  // socket.emit('connected', ID)
  io.emit('connected', ID)

  socket.on('shareID', function (data) {
    socket.broadcast.emit('enemyID', data)
      console.log(`data received is '${data}'`)
  });
  
  // players.push(ID)
  // socket.broadcast.emit('player_connected', ID)
  // io.sockets.emit('player_connected')
})

// io.on('share_myself', (message) => {
//   console.log('share myself')
// })


server.listen(80, () => undefined);