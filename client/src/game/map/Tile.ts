import { LocationType } from '../utils/types'
import { Map } from './Map'

export class Tile {
    private width: number
    private occupied: boolean = false
    private occupantID: number | null

    constructor(private x: number, private y: number, private map: Map) {
        this.occupantID = null
        this.width = this.map.tileSize
        this.drawTile()
    }

    public drawTile(color?: string) {
        const fillColor: string = color ? color : 'white'
        this.map.getMapContext.fillStyle = fillColor
        this.map.getMapContext.fillRect(this.x * this.width, this.y * this.width, this.width, this.width)
    }

    get isOccupied() {
        return this.occupied
    }

    public get getOccupant() {
        return this.occupantID
    }

    public get getLocation(): LocationType {
        return { x: this.x, y: this.y }
    }

    public setOccupied(ID: number) {
        this.occupied = true
        this.occupantID = ID
    }

    public setUnoccupied() {
        this.drawTile()
        this.occupied = false
        this.occupantID = null
    }
}
