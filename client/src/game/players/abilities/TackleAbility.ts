import { AbilityKey } from '../../managers/InputController'
import { Map } from '../../map/Map'
import { AbilityBase, AbilityStatus, ActivationType } from './AbilityBase'

// Make seperate Ability(Name) here that implements an interface
export class TackleAbility implements AbilityBase {
    private status: AbilityStatus = AbilityStatus.ready
    private cooldown: number = 10

    public type: ActivationType = ActivationType.direction

    constructor(private map: Map) {}

    public activate() {
        if (this.inCooldown) {
            return
        }
    }

    public deactivate() {
        if (!this.isActivated) {
            return
        }
        this.status = AbilityStatus.ready
    }

    public get isAvailable() {
        return true
    }

    private get inCooldown() {
        return this.status === AbilityStatus.inCooldown
    }

    private get isActivated() {
        return this.status === AbilityStatus.activated
    }
}
