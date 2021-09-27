import { GameComInfo } from '../../Game'
import { mergeLocations } from '../../utils/general'
import { Direction, LocationType, TileStatus } from '../../utils/types'
import { AbilityKey, ArrowKey } from '../../managers/InputController'
import { arrowKeyToCoordinates } from '../movement/movements'
import { findDirectionByKey } from '../movement/movementUtils'
import { ActivationType, DirectionAbility } from './AbilityBase'

export class TackleAbility implements DirectionAbility {
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

    private async handleTackleLogic(arrowKey: ArrowKey) {
        const locationIncrement = arrowKeyToCoordinates[arrowKey]
        const locationOne = mergeLocations(this.info.player.getLocation, locationIncrement)
        const tileOne: TileStatus = this.info.map.getTileStatus(locationOne)

        if (tileOne === TileStatus.NONEXISTENT) {
            return
        }
        if (tileOne === TileStatus.OCCUPIED) {
            const victimID = this.info.map.getTileByLocation(locationOne)?.getOccupant
            if (!victimID) {
                return
            }
            const direction = findDirectionByKey(arrowKey)
            this.emitBounce(victimID, direction)
            return
        }

        const locationTwo = mergeLocations(locationOne, locationIncrement)
        const secondTileStatus: TileStatus = this.info.map.getTileStatus(locationTwo)

        if (secondTileStatus === TileStatus.NONEXISTENT) {
            return
        }
        if (secondTileStatus === TileStatus.OCCUPIED) {
            const victimID = this.info.map.getTileByLocation(locationTwo)?.getOccupant
            if (!victimID) {
                return
            }
            const direction = findDirectionByKey(arrowKey)

            this.info.socket.emit('move', this.info.player.getID, locationOne)
            await this.info.player.move(locationOne)
            const victim = this.info.characters.find((character) => character.getID === victimID)
            if (!victim) {
                return
            }
            victim.receiveBounce(direction)
            this.info.socket.emit('bounce', victimID, direction)
            return
        }

        this.emitMove(locationTwo)
    }

    private emitBounce(victimID: number, direction: Direction) {
        const victim = this.info.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction)
        this.info.socket.emit('bounce', victimID, direction)
    }

    private emitMove(newLocation: LocationType) {
        this.info.player.move(newLocation)
        this.info.socket.emit('move', this.info.player.getID, newLocation)
    }
}
