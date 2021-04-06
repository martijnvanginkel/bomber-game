import crypto from 'crypto'
import { EventEmitter } from 'events'

let games: Game[] = []

export class Game extends EventEmitter {
    private identifier: string
    private clients: number

    constructor() {
        super()
        this.identifier = crypto.randomBytes(16).toString('hex')
        this.clients = 0
    }

    public get ID() {
        return this.identifier
    }

    public get isFullGame() {
        return this.clients === 2
    }

    public join(cb: () => void) {
        this.clients += 1
        if (this.isFullGame) {
            cb()
        }
    }

    public leave() {
        this.clients -= 1
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

export const disconnectFromGame = (game: Game) => {
    const existingGame = games.find((gm) => gm.ID === game.ID)
    if (!existingGame) {
        return
    }
    if (!existingGame.isFullGame) {
        existingGame.leave()
    } else {
        games = games.filter((gm) => gm.ID !== game.ID)
    }
}
