import { Player } from './Player'
import { Map } from './map/Map'

export class Game {

    private canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D
    public map: Map

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
    }

    public intializeGame() {
        // new Player('Player 1')
        this.map = new Map()
        new Player(0, 0)
    }


}

export const game = new Game()
// game.intializeGame()