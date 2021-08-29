import { Map } from './map/Map'
import { Socket } from 'socket.io-client'
import { Character } from './players/Character'
import { AbilityKey, InputController } from './managers/InputController'
import { Direction, LocationType } from './utils/types'
import { ArrowKey } from './managers/InputController'
import { AbilityManager } from './managers/AbilityManager'
import { ActionData, ActionEmitter } from './managers/ActionEmitter'

export interface GameInitInfo {
    gameID: string
    clients: number[]
    clientID: number
}

class Game {
    public constructor(
        private socket: Socket,
        private characters: Character[],
        private inputController: InputController,
        private abilityManager: AbilityManager,
        private actionEmitter: ActionEmitter,
    ) {
        this.sendActions()
        this.receiveActions()
    }

    private deleteListeners() {
        this.inputController.deleteListeners()
        this.characters.forEach((character) => character.removeAllListeners())
    }

    private sendActions() {
        this.inputController.on('arrow-click', (key: ArrowKey) => {
            const data: ActionData = this.abilityManager.handleArrowClick(key)
            this.actionEmitter.send(data)
        })
        this.inputController.on('ability-click', (key: AbilityKey) => {
            console.log('ability-click')
            // const data: ActionData = this.abilityManager.handleAbilityClick(key)
            // this.actionEmitter.send(data)
            // const { arrowKey, abilityKey } = event.detail
            // const action = findAbility(abilityKey, arrowKey, this.player, this.map)
            // action?.run(this.socket, this.characters)
        })
        this.inputController.on('ability-click', (key: AbilityKey) => {})
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

    private findCharacter(ID: number) {
        return this.characters.find((character) => character.getID === ID)
    }
}

export const createNewGame = (socket: Socket, gameInit: GameInitInfo, gameEndedCallback: () => void) => {
    const map = new Map()

    const characters = gameInit.clients.map((ID, index) => {
        return new Character(ID, index, 'green', map)
    })

    characters.forEach((character) => {
        character.addListener('lost-health', (e: CustomEvent) => {
            if (e.detail.health >= 0) {
                characters.forEach(async (character) => character.clearPosition())
                characters.forEach((character) => character.spawn())
            } else {
                gameEndedCallback()
            }
        })
    })

    const player = characters.find((character) => character.getID === gameInit.clientID)!

    return new Game(
        socket,
        characters,
        new InputController(),
        new AbilityManager(),
        new ActionEmitter(socket, map, characters, player),
    )
}
