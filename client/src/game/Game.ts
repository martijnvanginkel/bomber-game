import { Map } from './map/Map'
import { Images } from './images/Images'
import { Player } from './players/Player'
// import { Character } from './players/Character'
import { Socket } from 'socket.io-client'
import { Character } from './players/Character'
import { InputController } from './managers/InputController'
import { ArrowKey } from './utils/types'

export interface GameInitInfo {
    gameID: string
    clients: number[]
    clientID: number
}

class Game {
    private characters: Character[] = new Array()
    private player: Character

    public constructor(
        private socket: Socket,
        private gameInfo: GameInitInfo,
        private map: Map,
        private inputController: InputController,
    ) {
        this.createCharacters()
        this.shareActions()
    }

    private createCharacters() {
        this.gameInfo.clients.forEach((ID, index) => {
            const character = new Character(ID, index, 'green', this.map)
            this.characters.push(character)
            if (character.getID === ID) {
                this.player = character
            }
        })
    }

    private shareActions() {
        this.inputController.on('arrow-click', (key: ArrowKey) => {
            this.player.move(key)
        })
    }
}

export const createNewGame = (socket: Socket, gameInit: GameInitInfo) => {
    return new Game(socket, gameInit, new Map(), new InputController())
}
