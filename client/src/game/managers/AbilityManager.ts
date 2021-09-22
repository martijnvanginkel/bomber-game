import { TackleAbility } from 'game/players/abilities/TackleAbility'
import { Map } from 'game/map/Map'
import { ActionData, ActionType } from './ActionEmitter'
import { AbilityKey, ArrowKey } from './InputController'
import { AbilityBase, DirectionAbility, InstantAbility } from 'game/players/abilities/AbilityBase'
import { SmashAbility } from 'game/players/abilities/SmashAbility'

interface AbilityPlatform {
    instant: { [key: string]: InstantAbility }
    direction: { [key: string]: DirectionAbility }
}

export class AbilityManager {
    private abilities: AbilityPlatform

    public constructor(private map: Map) {
        // instant ability
        // direction ability
        // passive ability

        this.abilities = {
            instant: {
                [AbilityKey.W]: new SmashAbility(map),
            },
            direction: {
                [AbilityKey.Q]: new TackleAbility(map),
            },
        }

        // this.abilities = []

        // const one = new Ability(AbilityKey.qmap)

        // const abilities = [one]
    }

    // This should be kind of inside of the abilities itself with cooldown,  and the trigger CustomEvent shoulud be in the abstract 'parent'
    public handleAbilityClick(key: AbilityKey) {
        const ability = Object.keys(this.abilities).find((ability) => ability) //this.abilities[key]

        // if (!ability.isAvailable) {
        //     return
        // }

        // this.deactivateAbilities()
        // ability.activate()

        // check if its in cooldown
        // de-activate others if exists
        // activate or trigger new ability
    }

    public handleArrowClick(arrowKey: ArrowKey) {}

    private findAbilityByKey(abilityKey: AbilityKey) {
        return Object.keys(this.abilities).find((abilityType) => {
            return Object.keys(abilityType).find((key) => abilityKey)
        })
    }
}
