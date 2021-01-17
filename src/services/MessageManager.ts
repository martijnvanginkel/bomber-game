import io from 'socket.io-client';
import { Player } from './../Player';
import { Enemy } from './../Enemy'
import { ShareLocationType } from './../utils/types'

export interface ClientInfo {
    ID: string
    index: number
}

export class MessageManager {

    private socket: SocketIOClient.Socket
    private player: Player
    private enemies: Enemy[]

    constructor() {
        const port: number = 80
        const url: string = 'http://localhost'

        this.socket = io(`${url}:${port.toString()}`);
        this.enemies = new Array()

        this.socket.on('connected', (client: ClientInfo) => {
            this.establishConnection(client)
            this.outgoingPlayerEvents()
            this.incomingEnemyEvents()
        })
    }

    private establishConnection(client: ClientInfo) {
        
        this.player = new Player(client)
        this.socket.emit('shareClient', client)

        this.socket.on('incomingClient', (incomingClient: ClientInfo) => {
            this.enemies.push(new Enemy(incomingClient))
            this.socket.emit('secondShareClient', client)
        })

        this.socket.on('secondIncomingClient', (incomingClient: ClientInfo) => {
            this.enemies.push(new Enemy(incomingClient))
        })
    }

    private outgoingPlayerEvents() {
        this.player.playerEvents.on('move', (data) => {
            this.socket.emit('shareLocation', data)
        })
    }

    private incomingEnemyEvents() {
        this.socket.on('incomingLocation', (data: ShareLocationType) => {
            this.enemies.forEach((enemy: Enemy) => enemy.move(
                data.oldLocation,
                data.newLocation,
                data.ID,
                data.direction
            ))
        })
    }
}