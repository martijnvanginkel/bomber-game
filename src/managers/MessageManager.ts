import io from 'socket.io-client'
import { Player } from './../players/Player'
import { Enemy } from './../players/Enemy'
import { BounceData, Direction, ShareLocationType } from './../utils/types'
import { Ability } from './../players/actions/abilities'

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

        this.socket = io(`${url}:${port.toString()}`)
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
        this.player.playerEvents.on('move', (data: ShareLocationType) => {
            this.socket.emit('shareLocation', data)
        })
        this.player.playerEvents.on('ability', (ability: Ability) => {
            this.socket.emit('shareAbility', ability)
        })
        this.player.playerEvents.on('bounce', (data: BounceData) => {
            this.moveEnemyByBounce(data)
            this.socket.emit('shareBounce', data)
        })
    }

    private incomingEnemyEvents() {
        this.socket.on('incomingLocation', (data: ShareLocationType) => {
            this.enemies.forEach((enemy: Enemy) =>
                enemy.move(data.oldLocation, data.newLocation, data.ID, data.direction),
            )
        })

        this.socket.on('incomingAbility', (ability: Ability) => {
            this.enemies.forEach((enemy: Enemy) => {
                enemy.fireAbility(ability)
            })
        })

        this.socket.on('incomingBounce', (data: BounceData) => {
            this.moveEnemyByBounce(data)
            // const enemy = this.enemies.find((enemy) => enemy.getID === data.victimID)
            // enemy?.receiveBounce(data.incomingDirection)
        })
    }

    private moveEnemyByBounce(data: BounceData) {
        const enemy = this.enemies.find((enemy) => enemy.getID === data.victimID)
        enemy?.receiveBounce(data.incomingDirection)
    }
}
