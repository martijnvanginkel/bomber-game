import { TackleAbility } from 'game/players/abilities/TackleAbility'
import { Map } from 'game/map/Map'
import { ActionData, ActionType } from './ActionEmitter'
import { AbilityKey, ArrowKey } from './InputController'
import { AbilityBase } from 'game/players/abilities/AbilityBase'
import { SmashAbility } from 'game/players/abilities/SmashAbility'

export class AbilityManager {
    private abilities: { [key: string]: AbilityBase }

    public constructor(private map: Map) {
        this.abilities = {
            [AbilityKey.Q]: new TackleAbility(this.map),
            [AbilityKey.W]: new SmashAbility(this.map),
        }

        // this.abilities = []

        // const one = new Ability(AbilityKey.qmap)

        // const abilities = [one]
    }

    // This should be kind of inside of the abilities itself with cooldown,  and the trigger CustomEvent shoulud be in the abstract 'parent'
    public handleAbilityClick(key: AbilityKey) {
        const ability = this.abilities[key]

        if (!ability.isAvailable) {
            return
        }

        this.deactivateAbilities()
        ability.activate()

        // check if its in cooldown
        // de-activate others if exists
        // activate or trigger new ability
    }

    public handleArrowClick(arrowKey: ArrowKey) {}

    private deactivateAbilities() {
        Object.values(this.abilities).forEach((ability) => {
            ability.deactivate()
        })
    }
}
