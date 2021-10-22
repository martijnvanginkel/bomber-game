import { GameComInfo } from '../../Game'
import { AbilityKey, ArrowKey } from '../../managers/InputController'
import { AbilityBase, ActivationType } from './AbilityBase'

export abstract class DirectionAbility extends AbilityBase {

    private activated: boolean = false

    protected constructor(protected abilityKey: AbilityKey, protected info: GameComInfo, protected cooldownTime: number) {
        super(abilityKey, info, cooldownTime, ActivationType.direction)
    }

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

    public fire(arrowKey: ArrowKey) {
        this.trigger()
    }

    public trigger() {
//        if (!this.isActivated) {
//            return
//        }
        super.trigger()
//       this.fireTriggerEvent()
//        this.startCooldown()
//        await this.handleTackleLogic(arrowKey)
        this.deactivate()
    }

    public reset() {
        this.isInCooldown = false
        this.cooldown = this.cooldownTime
        this.activated = false
    }

    public get isActivated() {
        return this.activated
    }

    private setActivated(activated: boolean) {
        this.activated = activated
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
}
