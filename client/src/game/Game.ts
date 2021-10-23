import { Map } from './map/Map'
import { Socket } from 'socket.io-client'
import { Character } from './players/Character'
import { AbilityKey, InputController } from './managers/InputController'
import { Direction, LocationType } from './utils/types'
import { ArrowKey } from './managers/InputController'
import { AbilityManager } from './managers/AbilityManager'

export interface GameInitInfo {
    gameID: string
    clients: number[]
    clientID: number
}

export interface GameComInfo {
    map: Map
    socket: Socket
    player: Character
    characters: Character[]
}

class Game {
    public constructor(
        private socket: Socket,
        private characters: Character[],
        private inputController: InputController,
        private abilityManager: AbilityManager,
    ) {
        this.sendActions()
        this.receiveActions()
    }

    public respawn() {
        this.characters.forEach(async (character) => character.clearPosition())
        this.characters.forEach((character) => character.spawn())
        this.abilityManager.resetAbilities()
        const event = new CustomEvent('respawn', { bubbles: true, composed: true })
        dispatchEvent(event)
    }

    private sendActions() {
        this.inputController.on('arrow-click', (key: ArrowKey) => {
            this.abilityManager.handleArrowClick(key)
        })
        this.inputController.on('ability-click', (key: AbilityKey) => {
            this.abilityManager.handleAbilityClick(key)
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

        this.socket.on('bounce', (victimID: number, direction: Direction, multiplier?: number) => {
            const victim = this.findCharacter(victimID)
            if (!victim) {
                return
            }
            victim.receiveBounce(direction, multiplier)
        })
    }

    private findCharacter(ID: number) {
        return this.characters.find((character) => character.getID === ID)
    }
}

export const createNewGame = (socket: Socket, gameInit: GameInitInfo, gameEndedCallback: () => void) => {
    const map = new Map()
    const inputController = new InputController()
    const characters = gameInit.clients.map((ID, index) => new Character(ID, index, 'green', map))
    const player = characters.find((character) => character.getID === gameInit.clientID)!

    const info: GameComInfo = {
        map: map,
        socket: socket,
        player: player,
        characters: characters,
    }

    const abilityManager = new AbilityManager(info)
    const game = new Game(socket, characters, inputController, abilityManager)

    const deleteListeners = () => {
        inputController.deleteListeners()
        characters.forEach((character) => character.removeAllListeners())
    }

    characters.forEach((character) => {
        character.addListener('lost-health', (e: CustomEvent) => {
            if (e.detail.health >= 0) {
                game.respawn()
                return
            }
            deleteListeners()
            gameEndedCallback()
        })
    })

    return game
}
