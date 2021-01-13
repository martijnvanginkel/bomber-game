import { map } from './../index'

export class Tile {

    private xPos: number = 0
    private yPos: number = 0
    private width: number = 50
    private height: number = 50
    private occupied: boolean = false
    private occupantID: string | null

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos
        this.yPos = yPos
        this.occupantID = null
        this.drawTile()
    }

    public drawTile() {
        map.getContext.fillStyle = 'white'
        map.getContext.fillRect(this.xPos * this.width, this.yPos * this.height, this.width, this.height)
    }

    get isOccupied() {
        return this.occupied
    }

    public setOccupied(occupied: boolean, ID?: string) {
        this.occupied = occupied
        if (ID) {
            this.occupantID = ID
        } else {
            this.occupantID = null
        }
    }
}