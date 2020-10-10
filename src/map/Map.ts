import { Tile } from './Tile'

export class Map {

    private width: number = 10
    private height: number = 10
    private tileSize: number = 50
    public tileMap: Tile[][] = []

    constructor() {
        this.drawMap()
    }

    private drawMap() {
        for (let i = 0; i < this.height; i++) {
            const line: Array<Tile> = []
            for (let j = 0; j < this.width; j++) {
                const tile = new Tile(j * this.tileSize, i * this.tileSize, this.tileSize, this.tileSize)
                line.push(tile)
            }
            this.tileMap.push(line)
        }
    }

}