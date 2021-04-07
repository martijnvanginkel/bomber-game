import crypto from 'crypto'
import { EventEmitter } from 'events'

let games: Game[] = []

export class Game extends EventEmitter {
    private identifier: string
    private clients: number[]

    constructor() {
        super()
        this.identifier = crypto.randomBytes(16).toString('hex')
        this.clients = []
    }

    public get ID() {
        return this.identifier
    }

    public get isFullGame() {
        return this.clients.length === 2
    }

    public join(clientID: number, full: (gameID: string, clients: number[]) => void) {
        this.clients.push(clientID)
        if (this.isFullGame) {
            full(this.ID, this.clients)
        }
    }

    public leave(clientID: number) {
        this.clients = this.clients.filter((client) => client !== clientID)
    }
}

export const findGame = () => {
    const game = games.find((game) => !game.isFullGame)
    if (!game) {
        const newGame = new Game()
        games.push(newGame)
        return newGame
    }
    return game
}

export const disconnectFromGame = (game: Game, clientID: number) => {
    const existingGame = games.find((gm) => gm.ID === game.ID)
    if (!existingGame) {
        return
    }
    if (!existingGame.isFullGame) {
        existingGame.leave(clientID)
    } else {
        games = games.filter((gm) => gm.ID !== game.ID)
    }
}
