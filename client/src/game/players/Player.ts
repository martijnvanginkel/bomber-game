// import { ClientInfo } from '../managers/MessageDistributor'
// import { images, map } from '../../index'
import { Character } from './Character'
import { Direction, ArrowKey, AbilityKey, TileStatus, LocationType } from '../utils/types'
import { EventEmitter } from 'events'
import { Ability } from './actions/abilities'
import { Move } from './actions/movements'
import { formatAbilityToLocation } from './actions/utils/abilityUtils'
import { findCharacterAbility, findCharacterMove } from './actions/utils/characterUtils'
import { mergeLocations } from '../utils/general'
import { Images } from 'game/images/Images'
import { Map } from 'game/map/Map'

export class Player extends Character {
    private events: EventEmitter

    constructor(protected images: Images, protected map: Map) {
        super(images.getImage('player'), 'green', map)
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
        const move: Move = findCharacterMove(key, this.getCharacterType)
        const newLocation = mergeLocations(this.getLocation, move)
        const tileStatus: TileStatus = this.map.getTileStatus(newLocation)

        switch (tileStatus) {
            case TileStatus.NONEXISTENT:
                break
            case TileStatus.OCCUPIED:
                this.triggerBounce(newLocation, direction)
                break
            case TileStatus.AVAILABLE:
                this.triggerMove(newLocation, direction)
                break
            default:
                throw new Error('Unknown tile status?')
                break
        }
    }

    private triggerMove(newLocation: LocationType, direction: Direction) {
        this.move(this.getLocation, newLocation, this.getID, direction)
        this.events.emit('move', {
            oldLocation: this.getLocation,
            newLocation: newLocation,
            ID: this.getID,
            direction: direction,
        })
    }

    private triggerBounce(newLocation: LocationType, incomingDirection: Direction) {
        const tile = this.map.getTileByLocation(newLocation)
        if (!tile) {
            return
        }
        const occupantID = tile.getOccupant
        this.events.emit('bounce', {
            victimID: occupantID,
            incomingDirection: incomingDirection,
        })
    }
}
