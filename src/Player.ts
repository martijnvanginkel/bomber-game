import { game, connection } from './index'
import { ClientInfo, ShareLocationType, DoubleLocationType, LocationType } from './services/ConnectionManager'

export class Player {

    // private ID: string
    // private xPos: number = 0
    // private yPos: number = 0


    private location: LocationType // this needs to be different
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
        // game.map.set
        // this.drawPlayer()
        // this.watchPlayerMovement()
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
        
        const nextLocation: LocationType = {
            xPos: this.location.xPos + xIncrement,
            yPos: this.location.yPos + yIncrement
        }
        
        if (!game.map.availableTile(nextLocation.xPos, nextLocation.yPos)) {
            return
        }

        const currentTile = game.map.getTileByCoords(this.location.xPos, this.location.yPos)
        currentTile?.drawTile()
        currentTile?.setOccupied(false)
        
        const doubleLocation: DoubleLocationType = {
            oldLoc: this.location,
            newLoc: nextLocation,
            ID: this.getID
        }

        this.location = nextLocation

        const nextTile = game.map.getTileByCoords(this.location.xPos, this.location.yPos)
        nextTile?.setOccupied(true, this.getID)

        this.drawPlayer()


        connection.shareLocation(doubleLocation)
        
    }

    public moveOther(doubleLocation: DoubleLocationType) { 
        if (this.isMe) {
            return
        }

        console.log(doubleLocation)

        const oldTile = game.map.tileMap[doubleLocation.oldLoc.xPos][doubleLocation.oldLoc.yPos]
        oldTile?.drawTile()
        oldTile?.setOccupied(false)


        this.location = doubleLocation.newLoc

        const newTile = game.map.tileMap[doubleLocation.newLoc.xPos][doubleLocation.newLoc.yPos]
        newTile.setOccupied(true, doubleLocation.ID)

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