import io from 'socket.io-client';
import { Player } from '../Player';
import { Game } from './../Game';

export class ConnectionManager {

    private socket: SocketIOClient.Socket
    private address: string = 'http://localhost'
    private port: number = 80
    private game: Game

    constructor(game: Game) {
        this.game = game
        this.socket = io(`${this.address}:${this.port.toString()}`);
        this.socket.on('connected', (ID: string) => {
            this.establishConnection(ID)
        })
    }

    private establishConnection(ID: string) {
        this.game.addMyselfToGame(ID)
        this.socket.emit('shareMyID', ID)

        this.socket.on('incomingID', (ID: string) => {
            this.socket.emit('lastIncomingID', this.game.getMyPlayerID)
            this.game.addOtherToGame(ID)
        })
        // share last incoming ID one more time for the last client
        this.socket.on('lastIncomingID', (ID: string) => {
            this.game.addOtherToGame(ID)
        })

        this.socket.on('playerLeft', (ID: string) => {
            this.game.removePlayerFromGame(ID)
        })
    }
}