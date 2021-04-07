import { Map } from './map/Map'
import { Images } from './images/Images'
import { Player } from './players/Player'

export interface GameInitInfo {
    gameID: string
    clients: number[]
    clientID: number
}

class Game {
    public constructor(private gameInfo: GameInitInfo, private images: Images, private map: Map) {
        // new Player(playerID, map)
        this.initializeGame(gameInfo)
    }

    private initializeGame(gameInfo: GameInitInfo) {}
}

export const createNewGame = (gameInit: GameInitInfo) => {
    return new Game(gameInit, new Images(), new Map())
}
