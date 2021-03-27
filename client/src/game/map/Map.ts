import { TileStatus, LocationType } from './../utils/types'
import { Tile } from './Tile'

export class Map {
    private mapContext: CanvasRenderingContext2D
    private playerContext: CanvasRenderingContext2D

    private width: number = 10
    private height: number = 10

    // find solution for this
    public tileSize: number = 50
    public tileMap: Tile[][] = []

    constructor() {
        return
        const mapCanvas = document.getElementById('mapcanvas') as HTMLCanvasElement
        const playerCanvas = document.getElementById('playercanvas') as HTMLCanvasElement
        this.mapContext = mapCanvas.getContext('2d') as CanvasRenderingContext2D
        this.playerContext = playerCanvas.getContext('2d') as CanvasRenderingContext2D

        this.drawMap()
    }

    public get getMapContext() {
        return this.mapContext
    }

    public get getPlayerContext() {
        return this.playerContext
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
        if (x < 0 || y < 0) {
            return true
        }
        if (x > 9 || y > 9) {
            return true
        }
        return false
    }

    public getTileStatus(location: LocationType): TileStatus {
        if (this.exceedsMapBorders(location.x, location.y)) {
            return TileStatus.NONEXISTENT
        }
        if (this.isOccupiedTile(location)) {
            return TileStatus.OCCUPIED
        }
        return TileStatus.AVAILABLE
    }
}
