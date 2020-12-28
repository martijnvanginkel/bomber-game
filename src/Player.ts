import { game } from './index'

export class Player {

    private ID: string
    private xPos: number = 0
    private yPos: number = 0
    private image: HTMLImageElement
    private me: boolean

    constructor(ID: string) {
        this.ID = ID
    }

    get getID() {
        return this.ID
    }

    get isMe() {
        return this.me
    }

    set isMe(itsMe) {
        this.me = itsMe
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

    private movePlayer(newX: number, newY: number) {
        const nextXPos = this.xPos + newX
        const nextYPos = this.yPos + newY

        if (game.map.availableTile(nextXPos, nextYPos)) {
            game.map.tileMap[this.xPos][this.yPos].drawTile()
            this.xPos += newX
            this.yPos += newY
            this.drawPlayer()
        }
    }

    private watchPlayerMovement() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.movePlayer(-1, 0)
                    break;
                case 'ArrowUp':
                    this.movePlayer(0, -1)
                    break;
                case 'ArrowRight':
                    this.movePlayer(1, 0)
                    break;
                case 'ArrowDown':
                    this.movePlayer(0, 1)
                    break;
                default:
                    break;
            }
        })
    }
}