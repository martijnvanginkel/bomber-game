import { Map } from './map/Map'
import { Socket } from 'socket.io-client'
import { Character } from './players/Character'
import { InputController } from './managers/InputController'
import { ArrowKey, Direction, LocationType } from './utils/types'
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
        private gameEndedCallback: () => void,
    ) {
        // initialize
        this.createCharacters()

        // listening and sending actions
        this.sendActions()
        this.receiveActions()
    }

    private deleteListeners() {
        this.inputController.deleteListeners()
        this.characters.forEach((character) => character.removeAllListeners())
    }

    private createCharacters() {
        this.gameInfo.clients.forEach((ID, index) => {
            const character = new Character(ID, index, 'green', this.map)
            this.characters.push(character)
            character.addListener('lost-health', (_ID: number, health: number) => {
                if (health <= 0) {
                    this.respawnPlayers()
                } else {
                    this.deleteListeners()
                    this.gameEndedCallback()
                }
            })
            // character.addListener('lost-health', (ID: number, health: number) => {
            //     console.log('headf')
            //     const event = new CustomEvent('lost-health', {
            //         detail: {
            //             ID: ID,
            //             health: health,
            //         },
            //         bubbles: true,
            //         composed: true,
            //     })
            //     dispatchEvent(event)
            // })
            // character.addListener
            // character.addListener('lost-health', (ID: number, health: number) => {
            // if (health >= 0) {
            //     this.respawnPlayers()
            // } else {
            //     this.deleteListeners()
            //     this.gameEndedCallback()
            // }
            // })
        })
    }

    private respawnPlayers() {
        this.characters.forEach(async (character) => character.clearPosition())
        this.characters.forEach((character) => character.spawn())
    }

    private sendActions() {
        this.inputController.on('arrow-click', (key: ArrowKey) => {
            const action = findAction(key, this.player, this.map)
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
