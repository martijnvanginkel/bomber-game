import io from 'socket.io-client';
// import { MessageReceiver } from './MessageReceiver';
// import { MessageSender } from './MessageSender';
// import { EventEmitter } from 'events'
// import { Game } from '../Game';
import { Player } from '../Player';
// import { Game } from '../Game';
// import  from 'MessageSender'
// import MessageReceiver, { MessageReceiver, MessageReceiver, MessageReceiver } from 'MessageReceiver'


export interface ClientInfo {
    ID: string
    index: number
}

// export interface LocationType {
//     xPos: number
//     yPos: number
// }

// export interface ShareLocationType {
//     oldLoc: LocationType
//     newLoc: LocationType
//     ID: string
//     direction: number
// }

export class MessageManager {

    private socket: SocketIOClient.Socket
    private player: Player

    // public eventEmitter: EventEmitter
    // private messageReceiver: MessageReceiver
    // private messageSender: MessageSender


    // MessageManager luistert naar de Player. Wanneer de player iets doet met zijn input, 
    // dan luistert de MessageManager daarnaar en stuurt het vervolgens naar de enemies

    // De MessageManager heeft ook een listening gedeelte. Hierbij luistert hij naar de socket events
    // die vanuit de server komen. Deze stuurt het vervolgens naar de Player maar deze kunnen ook naar andere enemies gestuurd worden
    // er moet een functie 



    constructor() {
        const port: number = 80
        const url: string = 'http://localhost'

        this.socket = io(`${url}:${port.toString()}`);

        this.socket.on('connected', (client: ClientInfo) => {
            this.establishConnection(client)
        })
    }

    private establishConnection(client: ClientInfo) {
        // add my own client and player to game
        // console.log('asdf')
        this.player = new Player(client)

        this.socket.emit('shareClient', client)

        this.socket.on('incomingClient', (incomingClient: ClientInfo) => {
            // add enemy
            this.socket.emit('secondShareClient', client)
        })

        this.socket.on('secondIncomingClient', (incomingClient: ClientInfo) => {
            // add enemy
        })
    }


    // private establish() {
    //     this.socket = io(`${this.address}:${this.port.toString()}`);
    //     this.socket.on('connected', (client: ClientInfo) => {

    //     })
    // }

    // public shareLocation(shareLocation: ShareLocationType) {
    //     this.socket.emit('shareLocation', shareLocation)
    // }

    // private incomingLocation() {
    //     this.socket.on('incomingLocation', (shareLocation: ShareLocationType) => {
    //         this.game.moveOther(shareLocation)
    //     })
    // }

    // private establishConnection() {
    //     // this.game.addMyselfToGame(this.client)
    //     this.socket.emit('shareMyID', this.client)

    //     this.socket.on('incomingID', (client: ClientInfo) => {
    //         this.socket.emit('lastIncomingID', this.game.getMyPlayerClientInfo)
    //         this.game.addOtherToGame(client)
    //     })
    //     // share last incoming ID one more time for the last client
    //     this.socket.on('lastIncomingID', (client: ClientInfo) => {
    //         this.game.addOtherToGame(client)
    //     })

    //     this.socket.on('playerLeft', (ID: string) => {
    //         this.game.removePlayerFromGame(ID)
    //     })
    // }
}