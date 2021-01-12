import { EventEmitter } from 'events'

export class MessageSender {
    constructor(private socket: SocketIOClient.Socket, private events: EventEmitter){
        this.sendTest()
    }

    private sendTest() {
        this.events.emit('connected', '123123')
        // this.eventEmitter.on('connected', (message: any) => console.log(message))
    }


}