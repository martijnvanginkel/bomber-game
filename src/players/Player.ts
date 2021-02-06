import { ClientInfo } from '../managers/MessageManager'
import { images, map } from '../index'
import { Character } from './Character'
import { Direction, ArrowKey, AbilityKey, TileStatus } from '../utils/types'
import { EventEmitter } from 'events'
import { Ability } from './actions/abilities'
import { Move } from './actions/movements'
import { formatAbilityToLocation } from './actions/utils/abilityUtils'
import { findCharacterAbility, findCharacterMove } from './actions/utils/characterUtils'
import { mergeLocations } from '../utils/general'

export class Player extends Character {
    private events: EventEmitter

    constructor(protected clientInfo: ClientInfo) {
        super(clientInfo, images.getImage('player'), 'green')
        this.events = new EventEmitter()
        this.watchInput()
    }

    public get playerEvents() {
        return this.events
    }

    private watchInput() {
        document.addEventListener('keydown', (e) => {
            switch (e.code) {
                case 'ArrowLeft':
                    this.prepareMove(ArrowKey.LEFT, Direction.WEST)
                    break
                case 'ArrowUp':
                    this.prepareMove(ArrowKey.UP, Direction.NORTH)
                    break
                case 'ArrowRight':
                    this.prepareMove(ArrowKey.RIGHT, Direction.EAST)
                    break
                case 'ArrowDown':
                    this.prepareMove(ArrowKey.DOWN, Direction.SOUTH)
                    break
                case 'KeyQ':
                    this.prepareAbility(AbilityKey.Q)
                    break
            }
        })
    }

    private prepareAbility(key: AbilityKey) {
        const foundAbility: Ability = findCharacterAbility(key, this.getCharacterType)
        const ability = formatAbilityToLocation(foundAbility, this.getLocation, this.getDirection)
        this.events.emit('ability', ability)
        this.fireAbility(ability)
    }

    private prepareMove(key: ArrowKey, direction: Direction) {
        if (this.isMoving) {
            return
        }
        console.log('trig')

        const move: Move = findCharacterMove(key, this.getCharacterType)
        const newLocation = mergeLocations(this.getLocation, move)

        // I need to find a more elegant solution to not have to write if statements
        const tileStatus: TileStatus = map.getTileStatus(newLocation)
        if (tileStatus === TileStatus.NONEXISTENT) {
            return
        }
        if (tileStatus === TileStatus.OCCUPIED) {
            const tile = map.getTileByLocation(newLocation)!
            const occupantID = tile.getOccupant
            this.events.emit('bounce', {
                victimID: occupantID,
                incomingDirection: direction,
            })
            // console.log(occupantID)
            // console.log('occupied')
            return
        }

        // if (!map.availableLocation(newLocation)) {
        //     console.log()
        //     return
        // }
        console.log('playermove')

        this.move(this.getLocation, newLocation, this.getID, direction)

        this.events.emit('move', {
            oldLocation: this.getLocation,
            newLocation: newLocation,
            ID: this.getID,
            direction: direction,
        })
    }
}
