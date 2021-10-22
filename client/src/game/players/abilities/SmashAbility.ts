import { Map } from '../../map/Map'

// Make seperate Ability(Name) here that implements an interface
export class SmashAbility {
    private cooldown: number = 10

    constructor(private map: Map) {}

    public trigger() {}

    public reset() {}

}
