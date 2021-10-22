import { GameComInfo } from '../../Game'
import { mergeLocations } from '../../utils/general'
import { Direction, LocationType } from '../../utils/types'
import { AbilityKey, ArrowKey } from '../../managers/InputController'
import { directionToCoordinates } from '../movement/movements'
import { findDirectionByKey } from '../movement/movementUtils'
import { ActivationType } from './AbilityBase'
import { Tile } from '../../map/Tile' 

export class TackleAbility { // implements old DirectionAbility
    private cooldownTime: number = 5
    private cooldown: number = this.cooldownTime
    private isInCooldown: boolean = false

    private activated: boolean = false

    constructor(private abilityKey: AbilityKey, private info: GameComInfo) {}

    public activate() {
        if (this.isInCooldown) {
            return
        }
        this.setActivated(true)
        this.fireActivateEvent(true)
    }

    public deactivate() {
        this.setActivated(false)
        this.fireActivateEvent(false)
    }

    public async trigger(arrowKey: ArrowKey) {
        if (!this.isActivated) {
            return
        }

        this.fireTriggerEvent()
        this.startCooldown()
        await this.handleTackleLogic(arrowKey)
        this.deactivate()
    }

    public reset() {
        this.isInCooldown = false
        this.cooldown = this.cooldownTime
        this.activated = false
    }

    public get type() {
        return ActivationType.direction
    }

    public get isActivated() {
        return this.activated
    }

    private setActivated(activated: boolean) {
        this.activated = activated
    }

    private startCooldown() {
        this.isInCooldown = true
        this.cooldown -= 1
        const interval = setInterval(() => {
            this.cooldown -= 1
            if (this.cooldown === 0) {
                this.cooldown = this.cooldownTime
                clearInterval(interval)
                this.isInCooldown = false
            }
        }, 1000)
    }

    private fireActivateEvent(activated: boolean) {
        const event = new CustomEvent('activate-ability', {
            detail: {
                activated: activated,
                abilityKey: this.abilityKey,
            },
            bubbles: true,
            composed: true,
        })
        dispatchEvent(event)
    }

    private fireTriggerEvent() {
        const event = new CustomEvent('trigger-ability', {
            detail: {
                abilityKey: this.abilityKey,
                cooldownTime: this.cooldownTime,
            },
            bubbles: true,
            composed: true,
        })
        dispatchEvent(event)
    }

    private async handleTackleLogic(key: ArrowKey) { 
        const direction = findDirectionByKey(key)
        const tiles = this.getThreeTilesInDirection(direction)

        if (tiles[0].isOccupied) {
            const victimID = tiles[0].getOccupant!
            this.emitBounce(victimID, direction, 3)
            return
        }

        await this.emitMove(tiles[0].getLocation)

        if (tiles[1].isOccupied) {
            const victimID = tiles[1].getOccupant!
            this.emitBounce(victimID, direction, 2)
        }
    }

    private getThreeTilesInDirection(direction: Direction) {
        const startLocation = this.info.player.getLocation
        const locationIncrement = directionToCoordinates[direction]
        const locationOne = mergeLocations(startLocation, locationIncrement)
        const locationTwo = mergeLocations(locationOne, locationIncrement)
        const locationThree = mergeLocations(locationTwo, locationIncrement)
        const tileOne = this.info.map.getTileByLocation(locationOne)
        const tileTwo = this.info.map.getTileByLocation(locationTwo)
        const tileThree = this.info.map.getTileByLocation(locationThree)
        const tiles = [tileOne, tileTwo, tileThree].filter((tile): tile is Tile => !!tile)
        return tiles
    }

    private emitBounce(victimID: number, direction: Direction, multiplier?: number) {
        const victim = this.info.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction, multiplier)
        this.info.socket.emit('bounce', victimID, direction, multiplier)
    }

    private async emitMove(newLocation: LocationType) {
        this.info.socket.emit('move', this.info.player.getID, newLocation)
        await this.info.player.move(newLocation)
    }
}
