import { LocationType } from '../utils/types'
import { Map } from './Map'

export class Tile {
    private width: number = 50
    private height: number = 50
    private occupied: boolean = false
    private occupantID: string | null

    constructor(private x: number, private y: number, private map: Map) {
        this.occupantID = null
        this.drawTile()
    }

    public get getCanvasPosition(): LocationType {
        return {
            x: this.x * this.width,
            y: this.y * this.height,
        }
    }

    public drawTile(color?: string) {
        const fillColor: string = color ? color : 'white'
        this.map.getMapContext.fillStyle = fillColor
        this.map.getMapContext.fillRect(
            this.x * this.width,
            this.y * this.height,
            this.width,
            this.height,
        )
    }

    get isOccupied() {
        return this.occupied
    }

    public setOccupied(ID: string) {
        this.occupied = true
        this.occupantID = ID
    }

    public setUnoccupied() {
        this.drawTile()
        this.occupied = false
        this.occupantID = null
    }
}
