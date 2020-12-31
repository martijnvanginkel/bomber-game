import { LocationType, ShareLocationType } from '../services/ConnectionManager'
import { Tile } from './Tile'

export class Map {

    private width: number = 10
    private height: number = 10

    // find solution for this
    public tileSize: number = 50
    public tileMap: Tile[][] = []

    constructor() {
        this.drawMap()
    }

    private drawMap() {
        for (let i = 0; i < this.height; i++) {
            const line: Array<Tile> = []
            for (let j = 0; j < this.width; j++) {
                const tile = new Tile(i, j)
                line.push(tile)
            }
            this.tileMap.push(line)
        }
    }

    public getTileByCoords(xPos: number, yPos: number): Tile | undefined {
        return this.tileMap[xPos][yPos]
    }

    private isOccupiedTile(xPos: number, yPos: number): boolean {
        const tile = this.getTileByCoords(xPos, yPos)
        if (!tile) {
            return true
        }
        if (tile.isOccupied) {
            return true
        }
        return false
    }

    private exceedsMapBorders(xPos: number, yPos: number): boolean {
        if (xPos < 0  || yPos < 0) {
            return true
        }
        if (xPos > 9 || yPos > 9) {
            return true
        }
        return false
    }

    public availableTile(xPos: number, yPos: number): boolean {
        if (this.exceedsMapBorders(xPos, yPos)) {
            return false
        }
        if (this.isOccupiedTile(xPos, yPos)) {
            return false
        }
        return true
    }

    public setTileOccupied(location: LocationType) {
        const tile = this.getTileByCoords(location.xPos, location.yPos)
        tile?.setOccupied(true)
    }

}