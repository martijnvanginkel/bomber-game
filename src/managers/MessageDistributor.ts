import io from 'socket.io-client'
import { Player } from '../players/Player'
import { Enemy } from '../players/Enemy'
import { BounceData, Direction, ShareLocationType } from '../utils/types'
import { Ability } from '../players/actions/abilities'
import { ActionDistributor } from './ActionDistributor'
import { EventEmitter } from 'events'

export interface ClientInfo {
    ID: string
    index: number
}

export class MessageDistributor {
    private socket: SocketIOClient.Socket
    private playerEvents: EventEmitter
    private actions: ActionDistributor

    constructor() {
        const port: number = 80
        const url: string = 'http://localhost'

        this.socket = io(`${url}:${port.toString()}`)
        this.actions = new ActionDistributor()

        this.socket.on('connected', (client: ClientInfo) => {
            this.establishConnection(client)
            this.outgoingPlayerEvents()
            this.incomingEnemyEvents()
        })
    }

    private establishConnection(client: ClientInfo) {
        const player = new Player(client)
        this.playerEvents = player.playerEvents
        this.actions.addPlayer(player)
        this.socket.emit('shareClient', client)

        this.socket.on('incomingClient', (incomingClient: ClientInfo) => {
            this.actions.addEnemy(new Enemy(incomingClient))
            this.socket.emit('secondShareClient', client)
        })

        this.socket.on('secondIncomingClient', (incomingClient: ClientInfo) => {
            this.actions.addEnemy(new Enemy(incomingClient))
        })
    }

    private outgoingPlayerEvents() {
        this.playerEvents.on('move', (data: ShareLocationType) => {
            this.socket.emit('shareLocation', data)
        })
        this.playerEvents.on('ability', (ability: Ability) => {
            this.socket.emit('shareAbility', ability)
        })
        this.playerEvents.on('bounce', (data: BounceData) => {
            this.actions.moveCharacterByBounce(data)
            this.socket.emit('shareBounce', data)
        })
    }

    private incomingEnemyEvents() {
        this.socket.on('incomingLocation', (data: ShareLocationType) => {
            this.actions.moveEnemy(data)
        })

        this.socket.on('incomingAbility', (ability: Ability) => {
            // this.enemies.forEach((enemy: Enemy) => { enemy.fireAbility(ability) })
        })

        this.socket.on('incomingBounce', (data: BounceData) => {
            this.actions.moveCharacterByBounce(data)
        })
    }
}
