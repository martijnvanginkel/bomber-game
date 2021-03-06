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

    public drawTile(color?: string) {
        const fillColor: string = color ? color : 'white'
        this.map.getMapContext.fillStyle = fillColor
        this.map.getMapContext.fillRect(this.x * this.width, this.y * this.height, this.width, this.height)
    }

    get isOccupied() {
        return this.occupied
    }

    public get getOccupant() {
        return this.occupantID
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
