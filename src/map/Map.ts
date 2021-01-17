import { LocationType } from './../utils/types'
import { Tile } from './Tile'

export class Map {

    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D

    private width: number = 10
    private height: number = 10

    // find solution for this
    public tileSize: number = 50
    public tileMap: Tile[][] = []

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
        
        this.drawMap()
    }

    public get getContext() {
        return this.context
    }

    private drawMap() {
        for (let i = 0; i < this.height; i++) {
            const line: Array<Tile> = []
            for (let j = 0; j < this.width; j++) {
                const tile = new Tile(i, j, this)
                line.push(tile)
            }
            this.tileMap.push(line)
        }
    }

    public getTileByCoords(x: number, y: number): Tile | undefined {
        return this.tileMap[x][y]
    }

    private isOccupiedTile(x: number, y: number): boolean {
        const tile = this.getTileByCoords(x, y)
        if (!tile) {
            return true
        }
        if (tile.isOccupied) {
            return true
        }
        return false
    }

    private exceedsMapBorders(x: number, y: number): boolean {
        if (x < 0  || y < 0) {
            return true
        }
        if (x > 9 || y > 9) {
            return true
        }
        return false
    }

    public availableTile(x: number, y: number): boolean {
        if (this.exceedsMapBorders(x, y)) {
            return false
        }
        if (this.isOccupiedTile(x, y)) {
            return false
        }
        return true
    }

    public setTileOccupied(location: LocationType, ID: string) {
        const tile = this.getTileByCoords(location.x, location.y)
        tile?.setOccupied(true)
    }

    public setNewTileOccupied(oldLoc: LocationType, newLoc: LocationType, ID: string) {

        const currentTile = this.getTileByCoords(oldLoc.x, oldLoc.y)
        currentTile?.drawTile()
        currentTile?.setOccupied(false)

        const nextTile = this.getTileByCoords(newLoc.x, newLoc.y)
        nextTile?.setOccupied(true, ID)
    }

}