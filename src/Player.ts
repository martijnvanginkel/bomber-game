import { game, connection } from './index'
import { ClientInfo, ShareLocationType, DoubleLocationType, LocationType } from './services/ConnectionManager'

export class Player {

    private location: LocationType
    private image: HTMLImageElement
    private client: ClientInfo
    private me: boolean

    constructor(client: ClientInfo) {
        this.client = client
        this.image = game.images.getImage('player')
        this.location = {
            xPos: client.index,
            yPos: client.index,
        }
        this.spawnPlayer()
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

    private spawnPlayer() {
        game.map.setTileOccupied(this.location, this.getID) // this should be a general search
        this.drawPlayer()
        this.watchInput()
    }

    private drawPlayer() {
        game.context.drawImage(this.image, this.location.xPos * game.map.tileSize, this.location.yPos * game.map.tileSize, 50, 50)
    }

    private decideMovement(xIncrement: number, yIncrement: number) {
        if (!this.isMe) {
            return
        }
        
        const newLoc: LocationType = {
            xPos: this.location.xPos + xIncrement,
            yPos: this.location.yPos + yIncrement
        }
        
        if (!game.map.availableTile(newLoc.xPos, newLoc.yPos)) {
            return
        }
   
        connection.shareLocation({oldLoc: this.location, newLoc: newLoc, ID: this.getID})
        this.movePlayer(this.location, newLoc, this.getID)        
    }

    public movePlayer(oldLoc: LocationType, newLoc: LocationType, ID: string) {
        game.map.setNewTileOccupied(oldLoc, newLoc, ID)
        this.location = newLoc
        this.drawPlayer()
    }

    private watchInput() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.decideMovement(-1, 0)
                    break;
                case 'ArrowUp':
                    this.decideMovement(0, -1)
                    break;
                case 'ArrowRight':
                    this.decideMovement(1, 0)
                    break;
                case 'ArrowDown':
                    this.decideMovement(0, 1)
                    break;
                default:
                    break;
            }
        })
    }
}