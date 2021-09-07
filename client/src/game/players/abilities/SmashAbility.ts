import { AbilityBase, AbilityStatus, ActivationType } from './AbilityBase'
import { AbilityKey } from '../../managers/InputController'
import { Map } from '../../map/Map'

// Make seperate Ability(Name) here that implements an interface
export class SmashAbility implements AbilityBase {
    private status: AbilityStatus = AbilityStatus.ready
    private cooldown: number = 10

    public type: ActivationType = ActivationType.instant

    constructor(private map: Map) {}

    public activate() {}

    public deactivate() {}
}
