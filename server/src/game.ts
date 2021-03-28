import crypto from 'crypto'
import events, { EventEmitter } from 'events'

let games: Game[] = []

export class Game extends EventEmitter {
    private ID: string
    private clients: number
    // private myEvent: CustomEvent

    constructor() {
        super()
        this.ID = crypto.randomBytes(16).toString('hex')
        this.clients = 1
    }

    public get getID() {
        return this.ID
    }

    public get hasOneClient() {
        return this.clients === 1
    }

    public addOneClient() {
        console.log('add one client')

        this.on('asdf', () => console.log('asdf'))
        this.emit('asdf')

        // this.on('asdf', () => console.log('asdf'))
        // dispatchEvent(event)
        // this.clients += 1
    }

    public removeOneClient() {
        this.clients -= 1
    }
}

export const joinGame = (cb: () => void) => {
    let game = games.find((game) => game.hasOneClient)
    if (!game) {
        game = new Game()
        game.on('asdf', cb)
        game.addOneClient()
        games.push(game)
    } else {
        game.addOneClient()
    }
    return game
}

export const disconnectFromGame = (game: Game) => {
    const existingGame = games.find((gm) => gm.getID === game.getID)
    if (!existingGame) {
        return
    }
    if (!existingGame.hasOneClient) {
        existingGame.removeOneClient()
    } else {
        games = games.filter((gm) => gm.getID !== game.getID)
    }
}
