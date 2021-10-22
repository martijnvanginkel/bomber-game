import { GameComInfo } from '../../Game'
import { AbilityKey } from '../../managers/InputController'
import { LocationType, Direction } from '../../utils/types'

export enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

export abstract class AbilityBase {

    protected cooldown: number = 10
    protected isInCooldown: boolean = false

    protected constructor(protected abilityKey: AbilityKey, protected info: GameComInfo, protected cooldownTime: number, public activationType: ActivationType) {
        this.cooldown = cooldownTime
    }

    public trigger() {
//        if (this.isInCooldown) {
 //           return
//      }
        this.fireTriggerEvent()
        this.startCooldown()
    }

    public reset() {
        this.isInCooldown = false
        this.cooldown = this.cooldownTime
    } 

    public get type() {
        return this.activationType
    }

    protected startCooldown() {
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

    protected fireTriggerEvent() {
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

    protected emitBounce(victimID: number, direction: Direction, multiplier?: number) {
        const victim = this.info.characters.find((character) => character.getID === victimID)
        if (!victim) {
            return
        }
        victim.receiveBounce(direction, multiplier)
        this.info.socket.emit('bounce', victimID, direction, multiplier)
    }

    protected async emitMove(newLocation: LocationType) {
        this.info.socket.emit('move', this.info.player.getID, newLocation)
        await this.info.player.move(newLocation)
    }
}

export enum ActivationType {
    instant = 'instant',
    direction = 'direction',
}
//
//export interface InstantAbility extends AbilityBase {
//    trigger: () => void
//}
//
//export interface DirectionAbility extends AbilityBase {
//    activate: () => void
//    deactivate: () => void
//    trigger: (arrowKey: ArrowKey) => void
//    isActivated: boolean
//}
//
//export interface AbilityBase {
//    type: ActivationType
//    reset: () => void
//    // isAvailable: boolean
//    // activate: () => void
//    // deactivate: () => void
//}
