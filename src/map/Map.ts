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

    public getTileByLocation(location: LocationType): Tile | undefined {
        if (!this.exceedsMapBorders(location.x, location.y)) {
            return this.tileMap[location.x][location.y]
        }
    }

    private isOccupiedTile(location: LocationType): boolean {
        const tile = this.getTileByLocation(location)
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

    public availableLocation(location: LocationType): boolean {
        if (this.exceedsMapBorders(location.x, location.y)) {
            return false
        }
        if (this.isOccupiedTile(location)) {
            return false
        }
        return true
    }
}