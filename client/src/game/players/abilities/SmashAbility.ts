import { AbilityBase, AbilityStatus, ActivationType, InstantAbility } from './AbilityBase'
import { AbilityKey } from '../../managers/InputController'
import { Map } from '../../map/Map'

// Make seperate Ability(Name) here that implements an interface
export class SmashAbility implements InstantAbility {
    private status: AbilityStatus = AbilityStatus.ready
    private cooldown: number = 10

    constructor(private map: Map) {}

    public trigger() {}

    public reset() {}

    public get type() {
        return ActivationType.instant
    }
}
