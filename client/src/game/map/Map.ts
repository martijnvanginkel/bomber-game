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
        // const mapCanvas = document
        //     .querySelector('game-screen')
        //     ?.shadowRoot?.getElementById('mapcanvas') as HTMLCanvasElement
        // const playerCanvas = document
        //     .querySelector('game-screen')
        //     ?.shadowRoot?.getElementById('playercanvas') as HTMLCanvasElement
        // this.mapContext = mapCanvas.getContext('2d') as CanvasRenderingContext2D
        // this.playerContext = playerCanvas.getContext('2d') as CanvasRenderingContext2D

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

    private drawCanvases() {
        const shadowRoot = document.querySelector('game-screen')?.shadowRoot
        const canvasContainer = shadowRoot?.getElementById('canvas-container')
        if (!canvasContainer) {
            console.log('here')
            return
        }
        const mapCanvas = document.createElement('canvas')
        mapCanvas.id = 'mapcanvas'
        mapCanvas.width = this.mapSizeInPixels
        mapCanvas.height = this.mapSizeInPixels
        mapCanvas.style.cssText = 'position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;'
        canvasContainer.appendChild(mapCanvas)
        const mapContext = mapCanvas.getContext('2d')
        if (!mapContext) {
            console.log('here2')
            return
        }
        this.mapContext = mapContext
        const playerCanvas = document.createElement('canvas')
        playerCanvas.id = 'playercanvas'
        playerCanvas.width = this.mapSizeInPixels
        playerCanvas.height = this.mapSizeInPixels
        playerCanvas.style.cssText = 'position: absolute; left: 0; top: 0; z-index: 0; border: 1px solid red;'
        canvasContainer.appendChild(playerCanvas)
        const playerContext = playerCanvas.getContext('2d')
        if (!playerContext) {
            console.log('here3')
            return
        }
        this.playerContext = playerContext
        this.drawMap()
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
