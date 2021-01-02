import { Images } from './images/Images'
import { Player } from './Player'
import { Map } from './map/Map'
import { ClientInfo, DoubleLocationType } from './services/ConnectionManager'

export class Game {

    private canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D
    public map: Map
    public images: Images
    public players: Player[]

    constructor() {
        this.canvas = document.getElementById('canvas') as HTMLCanvasElement
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D
        this.players = new Array()
    }

    public intializeGame() {
        this.images = new Images()
        this.map = new Map()
    }

    get getAllPlayerIDs() {
        return this.players.map((player: Player) => player.getID)
    }

    get getMyPlayerID() {
        return this.players.find(player => player.isMe === true)?.getID
    }

    get getMyPlayerClientInfo() {
        return this.players.find(player => player.isMe === true)?.getClientInfo
    }

    private findPlayerByID(ID: string) {
        return this.players.find(player => player.getID === ID)
    }

    // this should maybe be combined and called by the same function
    public moveOther(doubleLoc: DoubleLocationType) {
        const player = this.findPlayerByID(doubleLoc.ID)
        const myID = this.getMyPlayerID
        if (player?.getID === myID) {
            return
        }
        player?.movePlayer(doubleLoc.oldLoc, doubleLoc.newLoc, doubleLoc.ID)
    }

    public addMyselfToGame(client: ClientInfo) {
        const playerExists = this.players.find(player => player.isMe === true)
        if (playerExists) {
            return
        }
        const newPlayer = new Player(client)
        newPlayer.isMe = true
        this.players.push(newPlayer)
    }
    
    public addOtherToGame(client: ClientInfo) {
        const playerExists = this.players.find(player => player.getID === client.ID)
        if (playerExists) {
            return
        }
        const player = new Player(client)
        this.players.push(player)
    }

    public removePlayerFromGame(ID: string) {
        this.players = this.players.filter((player: Player) => player.getID !== ID)
    }

}