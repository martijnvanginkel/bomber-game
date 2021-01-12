import { EventEmitter } from 'events'

interface ClientInfo {
    ID: string,
    index: number,
}

export class MessageReceiver {

    // private client: ClientInfo

    constructor(private socket: SocketIOClient.Socket, private events: EventEmitter) {

        this.listen()
        // this.socket.on('connected', (client: ClientInfo) => {
            // this.client = client
            // console.log('connected in receiver')
            // this.testEventEmitter()
            // this.eventEmitter.emit('connected', 'asdf')


            // this.eventEmitter.on('connected', function(message) {
            //     console.log('asdfasdf')
            //     console.log(message)
            // })
            // this.establishConnection()
            // this.incomingLocation()
        // })
        // this.listen()
    }

    private listen() {
        this.events.on('connected', (message) => {
            console.log(message)
        })
    }

    // private async testEventEmitter() {
    //     const eventEmitter = new EventEmitter()
    //     eventEmitter.on('connected', function(message) {
    //         console.log('asdfasdf')
    //         console.log(message)
    //     })
    //     eventEmitter.emit('connected', 'asdf')


    // }

}