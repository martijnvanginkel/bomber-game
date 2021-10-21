import {GameComInfo} from 'game/Game';
import { AbilityKey, ArrowKey } from 'game/managers/InputController'

export enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

export abstract class AbilityBase {

    private cooldown: number = 10
    private isInCooldown: boolean = false

    constructor(private abilityKey: AbilityKey, private info: GameComInfo, private cooldownTime: number) {
        this.cooldown = cooldownTime
    }

    public async trigger() {
        this.fireTriggerEvent()
        this.startCooldown()
    }

    public reset() {
        this.isInCooldown = false
        this.cooldown = this.cooldownTime
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
//export enum ActivationType {
//    instant = 'instant',
//    direction = 'direction',
//}
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
