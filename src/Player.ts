import { game } from './Game'

export class Player {

    private ID: string
    private xPos: number = 0
    private yPos: number = 0
    private image: HTMLImageElement

    constructor(ID: string) {
        this.ID = ID
    }

    get playerID() {
        return this.ID
    }
    
    public initializePlayer(startX: number ,startY: number) {
        this.xPos = startX
        this.yPos = startY
        this.image = game.images.getImage('player')
        this.drawPlayer()
        this.watchPlayerMovement()
    }

    private drawPlayer() {
        game.context.drawImage(this.image, this.xPos * game.map.tileSize, this.yPos * game.map.tileSize, 50, 50)
    }

    // sill needs checking for available tile
    private movePlayer(newX: number, newY: number) {

        const xPos = this.xPos + newX
        const yPos = this.yPos + newY

        if (game.map.availableTile(xPos, yPos)) {
            game.map.tileMap[this.xPos][this.yPos].drawTile()
            this.xPos += newX
            this.yPos += newY
            this.drawPlayer()
        }
    }

    private watchPlayerAbilities() {

    }

    private watchPlayerMovement() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft': // left
                    this.movePlayer(-1, 0)
                    break;
                case 'ArrowUp': // up
                    this.movePlayer(0, -1)
                    break;
                case 'ArrowRight': // right
                    this.movePlayer(1, 0)
                    break;
                case 'ArrowDown': // down
                    this.movePlayer(0, 1)
                    break;
                default:
                    break;
            }
        })
    }
}