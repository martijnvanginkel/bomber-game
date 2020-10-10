import { Preloader } from './images/preloader'
import { Player } from './Player'
import { Map } from './map/Map'

export class Game {

    private canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D
    public map: Map
    // public playerImage: HTMLImageElement

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    public intializeGame() {
        // new Player('Player 1')
        new Preloader() // this needs to be made into a generic loading image class
        this.map = new Map()
        // new Player(0, 0)
    }
}

export const game = new Game()