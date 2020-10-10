import { game } from './../Game'

export class Tile {

    private width: number = 0
    private height: number = 0
    private xPos: number = 0
    private yPos: number = 0

    // private context: CanvasRenderingContext2D

    constructor(xPos: number, yPos: number, width: number, height: number) {
        this.xPos = xPos
        this.yPos = yPos
        this.width = width
        this.height = height
        this.drawTile()
    }


    public drawTile() {
        game.context.fillStyle = 'blue'
        const rect = game.context.fillRect(this.xPos, this.yPos, this.width, this.height)
        // game.context.fillStyle = 'red'
        // rect.fill(rect)
    }
    
}