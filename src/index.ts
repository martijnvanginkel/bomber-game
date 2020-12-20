import { game } from './Game'
import io from 'socket.io-client';
// import SocketIO from "socket.io-client";

const socket: SocketIOClient.Socket = io('http://localhost');
// const socket: SocketIOClient.Socket = SocketIO('http://localhost');

game.intializeGame()

socket.on('connected', (ID: string) => {
    // set my own ID
    if (game.player === undefined) {
        game.spawnPlayer(ID)
        socket.emit('shareID', ID)
        console.log('my ID: ', ID)
    }

    socket.on('enemyID', (ID: string) => {
        if (game.enemy === undefined) {
            game.spawnEnemy(ID)
            socket.emit('shareID', game.player.playerID)
            console.log('enemyid', ID)
        }
    })

})



