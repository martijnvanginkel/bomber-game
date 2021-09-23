import { AbilityKey } from '../../managers/InputController'
import { Map } from '../../map/Map'
import { AbilityBase, AbilityStatus, ActivationType, DirectionAbility } from './AbilityBase'

// Make seperate Ability(Name) here that implements an interface
export class TackleAbility implements DirectionAbility {
    private status: AbilityStatus = AbilityStatus.ready
    private cooldown: number = 10

    // public type: ActivationType = ActivationType.direction

    constructor(private map: Map) {}

    public activate() {
        // if (this.inCooldown) {
        //     return
        // }
        // const firstMove = findCharacterMove(arrowKey, character.getCharacterType)
        // const firstLocation = mergeLocations(character.getLocation, firstMove)
        // const firstTileStatus: TileStatus = map.getTileStatus(firstLocation)
    }

    public deactivate() {}

    public trigger() {}

    public get type() {
        return ActivationType.direction
    }

    public get isActivated() {
        return false
    }
}
