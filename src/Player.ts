import { game } from './Game'

export class Player {

    private xPos: number = 0
    private yPos: number = 0

    constructor(startX: number ,startY: number) {
        this.xPos = startX
        this.yPos = startY
        this.drawPlayer()
        this.intializeInput()
    }

    private drawPlayer() {
        // game.context.drawImage(game.playerImage, this.xPos * game.map.tileSize, this.yPos * game.map.tileSize, 50, 50)
    }

    // sill needs checking for available tile
    private movePlayer(newX: number, newY: number) {
        game.map.tileMap[this.xPos][this.yPos].drawTile()
        this.xPos += newX
        this.yPos += newY
        this.drawPlayer()
    }

    private intializeInput() {
        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 37: // left
                    this.movePlayer(-1, 0)
                    break;
                case 38: // up
                    this.movePlayer(0, -1)
                    break;
                case 39: // right
                    this.movePlayer(1, 0)
                    break;
                case 40: // down
                    this.movePlayer(0, 1)
                    break;
                default:
                    break;
            }
        })
    }
}