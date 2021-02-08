import io from 'socket.io-client'
// import { io } from './../../node_modules/socket.io/client-di'
// import io from 'socket.io'
// import io from 'socket.io'
// import io from 'socket.io'
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
    private socket: any //SocketIOClient.Socket
    private playerEvents: EventEmitter
    private actions: ActionDistributor

    constructor() {
        const port: number = 9000
        const url: string = 'http://localhost'

        // const test = io()
        // const socket = io.Socket.

        const socket = io()
        // console.log(socket.on)
        // this.socket = io(`${url}:${port.toString()}`)
        this.actions = new ActionDistributor()
        console.log('here')
        // console.log(this.socket.io.on)
        // this.socket.
        // this.socket.on('connected', (client: ClientInfo) => {
        //     console.log('connected')
        //     this.establishConnection(client)
        //     this.outgoingPlayerEvents()
        //     this.incomingEnemyEvents()
        // })
    }

    private establishConnection(client: ClientInfo) {
        const player = new Player(client)
        this.playerEvents = player.playerEvents
        this.actions.addPlayer(player)
        this.socket.emit('shareClient', client)
        console.log('asdfasdf')

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
