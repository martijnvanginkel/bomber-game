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

    public respawn() {
        this.characters.forEach(async (character) => character.clearPosition())
        this.characters.forEach((character) => character.spawn())
    }

    private sendActions() {
        // sommigen trigger je meteen
        // sommigen wacht je op de arrow click en dan trigger je ze

        // definieer in een abstracte class een 'ability', deze voldoet aan bepaalde voorwaarde: getriggered door arrow? Of getriggered door indrukken?
        // paar dingen die je altijd doet bij elke ability: logica voor individuele

        this.inputController.on('arrow-click', (key: ArrowKey) => {
            this.abilityManager.handleArrowClick(key)
            // this.actionEmitter.send(data)
        })
        this.inputController.on('ability-click', (key: AbilityKey) => {
            // console.log('ability-click')
            const data = this.abilityManager.handleAbilityClick(key)
            // this.actionEmitter.send(data)
            // const { arrowKey, abilityKey } = event.detail
            // const action = findAbility(abilityKey, arrowKey, this.player, this.map)
            // action?.run(this.socket, this.characters)
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

    private findCharacter(ID: number) {
        return this.characters.find((character) => character.getID === ID)
    }
}

export const createNewGame = (socket: Socket, gameInit: GameInitInfo, gameEndedCallback: () => void) => {
    const map = new Map()
    const inputController = new InputController()
    const abilityManager = new AbilityManager(map)
    const characters = gameInit.clients.map((ID, index) => new Character(ID, index, 'green', map))
    const player = characters.find((character) => character.getID === gameInit.clientID)!
    const actionEmitter = new ActionEmitter(socket, map, characters, player)
    const game = new Game(socket, characters, inputController, abilityManager, actionEmitter)

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
