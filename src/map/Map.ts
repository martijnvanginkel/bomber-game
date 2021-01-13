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

    public setTileOccupied(location: LocationType, ID: string) {
        const tile = this.getTileByCoords(location.xPos, location.yPos)
        tile?.setOccupied(true)
    }

    public setNewTileOccupied(oldLoc: LocationType, newLoc: LocationType, ID: string) {

        const currentTile = this.getTileByCoords(oldLoc.xPos, oldLoc.yPos)
        currentTile?.drawTile()
        currentTile?.setOccupied(false)

        const nextTile = this.getTileByCoords(newLoc.xPos, newLoc.yPos)
        nextTile?.setOccupied(true, ID)
    }

}