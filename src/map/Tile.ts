import { game } from './../Game'

export class Tile {

    private xPos: number = 0
    private yPos: number = 0
    private width: number = 50
    private height: number = 50

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos
        this.yPos = yPos
        this.drawTile()
    }

    public drawTile() {
        // console.log(this.xPos, this.yPos, this.width, this.height)
        game.context.fillStyle = 'blue'
        game.context.fillRect(this.xPos * this.width, this.yPos * this.height, this.width, this.height)
    }
}