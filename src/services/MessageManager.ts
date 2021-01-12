import io from 'socket.io-client';
import { MessageReceiver } from './MessageReceiver';
import { MessageSender } from './MessageSender';
import { EventEmitter } from 'events'
// import { Game } from '../Game';
// import  from 'MessageSender'
// import MessageReceiver, { MessageReceiver, MessageReceiver, MessageReceiver } from 'MessageReceiver'


export interface ClientInfo {
    ID: string
    index: number
}

export interface LocationType {
    xPos: number
    yPos: number
}

export interface ShareLocationType {
    oldLoc: LocationType
    newLoc: LocationType
    ID: string
    direction: number
}

export class MessageManager {

    private socket: SocketIOClient.Socket
    private address: string = 'http://localhost'
    private port: number = 80

    public eventEmitter: EventEmitter
    private messageReceiver: MessageReceiver
    private messageSender: MessageSender
    // private game: Game
    // private client: ClientInfo

    constructor() {
        // this.game = game
        this.socket = io(`${this.address}:${this.port.toString()}`);

        // this.eventEmitter = new EventEmitter()
        // console.log('im here')

        this.socket.on('connected', async (client: ClientInfo) => {
            const events = new EventEmitter()

            this.messageReceiver = await new MessageReceiver(this.socket, events)

            this.messageSender = new MessageSender(this.socket, events)
        })

        // this.establish()

        // this.socket.on('connected', (client: ClientInfo) => {
        //     // this.client = client
        //     this.establishConnection()
        //     // this.incomingLocation()
        // })
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