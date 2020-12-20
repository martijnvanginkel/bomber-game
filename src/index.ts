import { game } from './Game'

import io from 'socket.io-client';
// import SocketIO from "socket.io-client";
//   io.sockets.emit('player_connected', 'asdf')


// console.log(io)

const socket: SocketIOClient.Socket = io('http://localhost');
// const socket: SocketIOClient.Socket = SocketIO('http://localhost');

// socket.broad

// socket.on('asdf', (data: string) => {
//     console.log(data)
// })

game.intializeGame()

socket.on('player_connected', (ID: string) => {

    console.log('new player connected', ID)

    game.spawnPlayer(ID)

})



