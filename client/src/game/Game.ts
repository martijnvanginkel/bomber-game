import { Map } from './map/Map'
import { Images } from './images/Images'
// import { Player } from './players/Player'
// import { Character } from './players/Character'
import { Socket } from 'socket.io-client'
import { Character } from './players/Character'
import { InputController } from './managers/InputController'
import { ArrowKey, LocationType } from './utils/types'
import { findAction } from './managers/ActionConsultant'

export interface GameInitInfo {
    gameID: string
    clients: number[]
    clientID: number
}

class Game {
    private characters: Character[] = new Array()

    public constructor(
        private socket: Socket,
        private gameInfo: GameInitInfo,
        private map: Map,
        private inputController: InputController,
    ) {
        // initialize
        this.createCharacters()

        // listening and sending actions
        this.sendActions()
        this.receiveActions()
    }

    private createCharacters() {
        this.gameInfo.clients.forEach((ID, index) => {
            const character = new Character(ID, index, 'green', this.map)
            this.characters.push(character)
        })
    }

    private sendActions() {
        this.inputController.on('arrow-click', (key: ArrowKey) => {
            console.log('send action')
            const me = this.player
            console.log(me.getID)
            const action = findAction(key, this.player, this.map)
            action?.run(this.socket)
        })
    }

    private receiveActions() {
        this.socket.on('move', (ID: number, newLocation: LocationType) => {
            console.log('receive')
            const character = this.findCharacter(ID)
            character?.move(newLocation)
        })
    }

    private get player() {
        return this.characters.find((character) => character.getID === this.gameInfo.clientID)!
    }

    private findCharacter(ID: number) {
        return this.characters.find((character) => character.getID === ID)
    }

    private get enemies() {
        return this.characters.filter((character) => character.getID !== this.gameInfo.clientID)!
    }
}

export const createNewGame = (socket: Socket, gameInit: GameInitInfo) => {
    return new Game(socket, gameInit, new Map(), new InputController())
}
