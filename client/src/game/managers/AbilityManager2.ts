import { Ability } from 'game/Ability'
import { Map } from 'game/map/Map'
import { ActionData, ActionType } from './ActionEmitter'
import { AbilityKey, ArrowKey } from './InputController'

export class AbilityManager {
    public constructor(private map: Map) {
        // this.abilities = []

        const one = new Ability(map)

        const abilities = [one]
    }

    // This should be kind of inside of the abilities itself with cooldown,  and the trigger CustomEvent shoulud be in the abstract 'parent'
    public handleAbilityClick(key: AbilityKey) {
        // check if its in cooldown
        // de-activate others if exists
        // activate or trigger new ability
    }

    public handleArrowClick(arrowKey: ArrowKey) {}
}
