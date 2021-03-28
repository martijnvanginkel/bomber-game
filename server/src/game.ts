import crypto from 'crypto'

export interface Game {
    ID: string
    clients: number
}

let games: Game[] = []

const createNewGame = () => {
    return {
        ID: crypto.randomBytes(16).toString('hex'),
        clients: 1,
    }
}

const findGameWithOneClient = () => {
    return games.find((game) => game.clients === 1)
}

export const joinGame = () => {
    let game = findGameWithOneClient()
    if (!game) {
        game = createNewGame()
        games.push(game)
    } else {
        game.clients += 1
    }
    return game
}

export const disconnectFromGame = (game: Game) => {
    const existingGame = games.find((gm) => gm.ID === game.ID)
    if (!existingGame) {
        return
    }
    if (existingGame.clients > 1) {
        existingGame.clients -= 1
    } else {
        games = games.filter((gm) => gm.ID !== game.ID)
    }
}
