import { TileStatus, LocationType } from './../utils/types'
import { Tile } from './Tile'

export class Map {
    private mapContext: CanvasRenderingContext2D
    private playerContext: CanvasRenderingContext2D

    private tilesInMapWidth: number = 10
    private mapSizeInPixels: number = 500

    // find solution for this
    public tileSize: number = 50
    public tileMap: Tile[][] = []

    constructor() {
        this.setTileAndMapSize()
        this.drawCanvases()
    }

    public get getMapContext() {
        return this.mapContext
    }

    public get getPlayerContext() {
        return this.playerContext
    }

    private setTileAndMapSize() {
        const mapSize = this.getBrowserWindowSize()
        this.tileSize = mapSize / this.tilesInMapWidth
        this.mapSizeInPixels = mapSize
    }

    private getBrowserWindowSize() {
        const width = window.innerWidth
        const height = window.innerHeight

        const smallest = Math.min(width, height)
        const margin = smallest / 10
        const roundedDown = Math.round((smallest - margin) / 100) * 100 // is always a rounded 100 number
        return roundedDown
    }

    // TO DO: clean up this function and simplify
    private drawCanvases() {
        const shadowRoot = document.querySelector('game-screen')?.shadowRoot
        const canvasContainer = shadowRoot?.getElementById('canvas-container')
        const mapCanvas = this.createCanvas('mapcanvas')
        const playerCanvas = this.createCanvas('playercanvas')
        const mapContext = mapCanvas.getContext('2d')
        const playerContext = playerCanvas.getContext('2d')
        if (!canvasContainer || !mapContext || !playerContext) {
            return
        }
        canvasContainer.appendChild(mapCanvas)
        canvasContainer.appendChild(playerCanvas)
        this.mapContext = mapContext
        this.playerContext = playerContext
        this.drawMap()
    }

    private createCanvas(idName: string) {
        const canvas = document.createElement('canvas')
        canvas.id = idName
        canvas.width = this.mapSizeInPixels
        canvas.height = this.mapSizeInPixels
        canvas.style.cssText = 'position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;'
        return canvas
    }

    private drawMap() {
        for (let i = 0; i < this.tilesInMapWidth; i++) {
            const line: Array<Tile> = []
            for (let j = 0; j < this.tilesInMapWidth; j++) {
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
        const min = 0
        const max = this.tilesInMapWidth - 1

        if (x < min || y < min) {
            return true
        }
        if (x > max || y > max) {
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
