import {GameComInfo} from './../../Game
import {AbilityKey} from "../managers/InputController";

export abstract class AbilityBase2 {

    public constructor(private key: AbilityKey, private info: GameComInfo)
    {
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
