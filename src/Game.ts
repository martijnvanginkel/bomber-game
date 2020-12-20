import { Images } from './images/Images'
import { Player } from './Player'
import { Map } from './map/Map'

export class Game {

    private canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D
    public map: Map
    public images: Images
    public player: Player
    public enemy: Player

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
        // this.players = new Array()
    }

    public intializeGame() {
        this.images = new Images()
        this.map = new Map()
        // this.players = new Array()

        // new Player(0, 0)
    }

    public spawnPlayer(ID: string) {
        if (!this.player) {
            // console.log('spawnplayer if')
            this.player = new Player(ID)
        }
    }

    public spawnEnemy(ID: string) {
        if (!this.enemy) {
            this.enemy = new Player(ID)
        }
    }

}

export const game = new Game()