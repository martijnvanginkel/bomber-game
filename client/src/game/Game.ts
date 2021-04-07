import { Map } from './map/Map'
import { Images } from './images/Images'
import { Player } from './players/Player'
import { Enemy } from './players/Enemy'

export interface GameInitInfo {
    gameID: string
    clients: number[]
    clientID: number
}

class Game {
    private player: Player
    private enemies: Enemy[] = new Array()
    private characters: (Player | Enemy)[] = new Array()

    public constructor(private gameInfo: GameInitInfo, private images: Images, private map: Map) {
        // new Player(playerID, map)
        this.initializeGame()
    }

    private initializeGame() {
        console.log('initialize')
        const sorted = this.gameInfo.clients.sort((a, b) => a - b)
        console.log(sorted)
        this.gameInfo.clients.forEach((ID, index) => {
            if (ID === this.gameInfo.clientID) {
                const player = new Player(ID, index, this.map)
                this.player = player
                this.characters.push(player)
            } else {
                const enemy = new Enemy(ID, index, this.map)
                this.enemies.push(enemy)
                this.characters.push(enemy)
            }
        })
    }
}

export const createNewGame = (gameInit: GameInitInfo) => {
    return new Game(gameInit, new Images(), new Map())
}
