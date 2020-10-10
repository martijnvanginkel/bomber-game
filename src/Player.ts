import { game } from './Game'
import { Map } from './map/Map'

export class Player {

    private xPos: number = 0
    private yPos: number = 0

    constructor(xPos: number ,yPos: number) {
        this.xPos = xPos
        this.yPos = yPos
        this.drawPlayer()
        // document.addEventListener('keydown', this.inputManager())
        this.inputManager()
    }

    private drawPlayer() {
        game.context.fillStyle = 'red'
        const rect = game.context.fillRect(this.xPos, this.yPos, 50, 50)
        // game.context.fill()
        // game.context.clearRect(rect)
    }

    private movePlayer() {

        game.map.tileMap[this.xPos][this.yPos].drawTile()
        // Map.
        // game.context.clearRect(this.xPos, this.yPos, 50, 50)
        // this.xPos += (x * this.speed)
        // this.yPos += (y * this.speed)
        // game.context.fillRect(this.xPos, this.yPos, this.width, this.height)
    }

    private inputManager() {
        document.addEventListener('keydown', (e) => {

            switch (e.keyCode) {
                case 37: // left
                console.log('left')
                    // this.movePlayer(-1, 0)
                    break;
                case 38: // up
                // this.movePlayer(0, 1)
                    break;
                case 39: // right
                    this.movePlayer()
                    // this.movePlayer(1, 0)
                    break;
                case 40: // down
                    // this.movePlayer(0, -1)
                    break;
    
                default:
                    break;
            }
        })
        // document.onkeydown = (e) => {
        // }
    }
}