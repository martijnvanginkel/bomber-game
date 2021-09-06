import { AbilityKey } from './managers/InputController'
import { Map } from './map/Map'

enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

export class Ability {
    private status: AbilityStatus = AbilityStatus.ready
    private cooldown: number = 10

    constructor(private abilityKey: AbilityKey, private instant: boolean, private map: Map) {}
}
