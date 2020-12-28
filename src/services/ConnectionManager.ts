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
        this.establishConnection()
    }

    private establishConnection() {
        this.socket = io(`${this.address}:${this.port.toString()}`);



        this.socket.on('connected', (ID: string) => {
            // set my own ID
            // console.log('con')

            // console.log(this.iAmConnected)
            // if (!this.iAmConnected) {
            this.game.addMyselfToGame(ID)
            // console.log('me ', ID)
            // this.
            this.socket.emit('shareMyself', ID)

            this.socket.on('otherConnected', (ID2: string) => {
                // console.log('other ', ID2)
                this.socket.emit('extraEmit', this.game.getMyself)
                this.game.addPlayerTogame(ID2)
            })

            this.socket.on('extraEmit', (ID: string) => {
                this.game.addPlayerTogame(ID)
                // console.log()
            })

            this.socket.on('disconnect', () => {
                this.socket.removeAllListeners()
            })
           

        })
        
        

        // this.socket.on('connectMe', (ID: string) => {
        //     this.connectMyself(ID)
        //     this.socket.on('connectOther', (ID: string) => {
        //         this.connectOther(ID)
        //     })
        // })

    }

    private get iAmConnected() {
        return this.game.players.find(player => player.isMe === true) ? true : false
    } 

    private hasConnection(ID: string) {
        return this.game.getPlayerIDs.find(playerId => playerId === ID) ? true : false
    }

    // private connectPlayer(ID: string) {

    //     if (!this.iAmConnected) {
    //         this.connectMyself(ID)
    //     }
    //     else {
    //         this.connectOther(ID)
    //     }
    //     // console.log(findMe)
    // }

    // private connectOther(ID: string) {

    //     this.socket.emit('shareIDs', this.game.getPlayerIDs)

    //     const newPlayer = new Player(ID)
    //     this.game.players.push(newPlayer)

    //     this.socket.on('shareIDs', (IDs: string[]) => {

    //         console.log(IDs)
    //         for (const ID in IDs) {
    //             const IDExists = this.game.getPlayerIDs.find(playerID => playerID === ID)
    //             if (!IDExists) {
    //                 const newPlayer = new Player(ID)
    //                 this.game.players.push(newPlayer)
    //                 console.log('other found: ', ID)
    //             }
    //         }

    //     })
    // }

    private connectOther(ID: string) {
        if (!this.hasConnection(ID)) {
            const newPlayer = new Player(ID)
            this.game.players.push(newPlayer)
            console.log('other: ', ID)
        }
    }

    private connectMyself(ID: string) {
        if (!this.iAmConnected) {
            const newPlayer = new Player(ID)
            newPlayer.isMe = true
            this.game.players.push(newPlayer)
            console.log('me: ', ID)
        }
    }
}