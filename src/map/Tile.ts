import { Map } from './Map'

export class Tile {

    private width: number = 50
    private height: number = 50
    private occupied: boolean = false
    private occupantID: string | null

    constructor(private xPos: number, private yPos: number, private map: Map) {
        this.occupantID = null
        this.drawTile()
    }

    public drawTile() {
        this.map.getContext.fillStyle = 'white'
        this.map.getContext.fillRect(this.xPos * this.width, this.yPos * this.height, this.width, this.height)
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