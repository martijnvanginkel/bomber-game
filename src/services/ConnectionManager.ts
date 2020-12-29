import io from 'socket.io-client';
// import { Player } from '../Player';
import { Game } from './../Game';

export interface ClientInfo {
    ID: string
    index: number
}

export interface ShareLocationType {
    xPos: number
    yPos: number
    ID: string
}

export class ConnectionManager {

    private socket: SocketIOClient.Socket
    private address: string = 'http://localhost'
    private port: number = 80
    private game: Game
    private client: ClientInfo

    constructor(game: Game) {
        this.game = game
        this.socket = io(`${this.address}:${this.port.toString()}`);
        this.socket.on('connected', (client: ClientInfo) => {
            this.client = client
            this.establishConnection()
            this.incomingLocation()
        })
    }

    public shareLocation(location: ShareLocationType) {
        console.log('share location')
        this.socket.emit('shareLocation', location)
    }

    private incomingLocation() {
        this.socket.on('incomingLocation', (location: ShareLocationType) => {
            this.game.moveOther(location)
            // console.log('incoming location')
            // console.log(location)
            // this.game.movePlayer(location)
        })
    }

    private establishConnection() {
        // console.log('establish')
        this.game.addMyselfToGame(this.client)
        this.socket.emit('shareMyID', this.client)

        this.socket.on('incomingID', (client: ClientInfo) => {
            this.socket.emit('lastIncomingID', this.game.getMyPlayerClientInfo)
            this.game.addOtherToGame(client)
        })
        // share last incoming ID one more time for the last client
        this.socket.on('lastIncomingID', (client: ClientInfo) => {
            this.game.addOtherToGame(client)
        })

        this.socket.on('playerLeft', (ID: string) => {
            this.game.removePlayerFromGame(ID)
        })
    }
}