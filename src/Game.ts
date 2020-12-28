import { Images } from './images/Images'
import { Player } from './Player'
import { Map } from './map/Map'

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
        // new Player(0, 0)
    }

    get getAllPlayerIDs() {
        return this.players.map((player: Player) => player.getID)
    }

    get getMyPlayerID() {
        return this.players.find(player => player.isMe === true)?.getID
    }

    public addMyselfToGame(ID: string) {
        const playerExists = this.players.find(player => player.isMe === true)
        if (playerExists) {
            return
        }
        const newPlayer = new Player(ID)
        newPlayer.isMe = true
        this.players.push(newPlayer)
        this.players[0].initializePlayer(0, 0)
        console.log(this.getAllPlayerIDs)
    }
    
    public addOtherToGame(ID: string) {
        const playerExists = this.players.find(player => player.getID === ID)
        if (playerExists) {
            return
        }
        const player = new Player(ID)
        this.players.push(player)
        console.log(this.getAllPlayerIDs)
    }

    public removePlayerFromGame(ID: string) {
        this.players = this.players.filter((player: Player) => player.getID !== ID)
    }

}