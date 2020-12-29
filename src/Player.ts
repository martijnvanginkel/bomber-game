import { game, connection } from './index'
import { ClientInfo, ShareLocationType } from './services/ConnectionManager'

export class Player {

    // private ID: string
    // private xPos: number = 0
    // private yPos: number = 0


    private location: ShareLocationType
    private image: HTMLImageElement
    private client: ClientInfo
    private me: boolean

    constructor(client: ClientInfo) {
        this.client = client
        this.location = {
            xPos: client.index,
            yPos: client.index,
            ID: client.ID,
        }
        this.initializePlayer()
    }

    get getID() {
        return this.client.ID
    }

    get getClientInfo() {
        return this.client
    }

    get isMe() {
        return this.me
    }

    set isMe(itsMe) {
        this.me = itsMe
    }
    
    private initializePlayer() {
        this.image = game.images.getImage('player')
        this.drawPlayer()
        console.log('here')
        connection.shareLocation(this.location)
        // this.

        this.watchPlayerMovement()
    }

    private drawPlayer() {
        game.context.drawImage(this.image, this.location.xPos * game.map.tileSize, this.location.yPos * game.map.tileSize, 50, 50)
    }

    private movePlayer(newX: number, newY: number) {
        if (this.isMe) {
            const nextXPos = this.location.xPos + newX
            const nextYPos = this.location.yPos + newY
    
            if (game.map.availableTile(nextXPos, nextYPos)) {
                game.map.tileMap[this.location.xPos][this.location.yPos].drawTile()
                this.location.xPos += newX
                this.location.yPos += newY
                this.drawPlayer()
            }
        }

    }

    private watchPlayerMovement() {
        // console.log('this')
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