import { Map } from './map/Map'
import { Socket } from 'socket.io-client'
import { Character } from './players/Character'
import { InputController } from './managers/InputController'
import { Direction, LocationType } from './utils/types'
import { findAbility, findMove } from './managers/ActionConsultant'
import { ArrowKey } from './managers/InputController'

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
        private gameEndedCallback: () => void,
    ) {
        // initialize
        this.createCharacters()

        // listening and sending actions
        this.sendActions()
        this.receiveActions()
    }

    public deleteListeners() {
        this.inputController.deleteListeners()
    }

    private createCharacters() {
        this.gameInfo.clients.forEach((ID, index) => {
            const character = new Character(ID, index, 'green', this.map, () => {
                this.gameEndedCallback()
            })
            this.characters.push(character)
        })
    }

    private sendActions() {
        this.inputController.listenToArrowClick((key: ArrowKey) =>  {
            // console.log(key)
            const move = findMove(key, this.player, this.map)
            move?.run(this.socket, this.characters)
        })
        this.inputController.on('arrow-click', (key: ArrowKey) => {
        })
        this.inputController.on('ability-trigger', event => {
            const { arrowKey, abilityKey } = event.detail
            const action = findAbility(abilityKey, arrowKey, this.player, this.map)
            action?.run(this.socket, this.characters)
        })
    }

    private receiveActions() {
        this.socket.on('move', (ID: number, newLocation: LocationType) => {
            const character = this.findCharacter(ID)
            if (!character) {
                return
            }
            character.move(newLocation)
        })

        this.socket.on('bounce', (victimID: number, direction: Direction) => {
            const victim = this.findCharacter(victimID)
            if (!victim) {
                return
            }
            victim.receiveBounce(direction)
        })
    }

    private get player() {
        return this.characters.find((character) => character.getID === this.gameInfo.clientID)!
    }

    private findCharacter(ID: number) {
        return this.characters.find((character) => character.getID === ID)
    }
}

export const createNewGame = (socket: Socket, gameInit: GameInitInfo, gameEndedCallback: () => void) => {
    return new Game(socket, gameInit, new Map(), new InputController(), gameEndedCallback)
}
