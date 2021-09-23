import { TackleAbility } from '../players/abilities/TackleAbility'
import { Map } from 'game/map/Map'
import { ActionData, ActionType } from './ActionEmitter'
import { AbilityKey, ArrowKey } from './InputController'
import { AbilityBase, ActivationType, DirectionAbility, InstantAbility } from '../players/abilities/AbilityBase'
import { SmashAbility } from '../players/abilities/SmashAbility'
import { Direction } from 'game/utils/types'
import { directionToCoordinates } from 'game/players/movement/movements'

// interface AbilityPlatform {
//     [key: AbilityKey]: { [key: string]: InstantAbility }
//     // [ActivationType.direction]: { [key: string]: DirectionAbility }
// }

export class AbilityManager {
    private abilities: {
        [ActivationType.direction]: { [key: string]: DirectionAbility }
        [ActivationType.instant]: { [key: string]: InstantAbility }
    }

    public constructor(private map: Map) {
        // instant ability
        // direction ability
        // passive ability
        this.abilities = {
            [ActivationType.direction]: {
                [AbilityKey.Q]: new TackleAbility(map),
            },
            [ActivationType.instant]: {
                [AbilityKey.W]: new SmashAbility(map),
            },
        }
    }

    // This should be kind of inside of the abilities itself with cooldown,  and the trigger CustomEvent shoulud be in the abstract 'parent'
    public handleAbilityClick(key: AbilityKey) {
        const ability = this.findAbilityByKey(key)

        if (!ability) {
            return
        }

        const actions = {
            [ActivationType.direction]: () => {
                this.activateDirectionAbility(ability as DirectionAbility)
            },
            [ActivationType.instant]: () => {
                // ;(ability as InstantAbility).trigger()
            },
        }

        actions[ability.type]
    }

    public handleArrowClick(arrowKey: ArrowKey) {
        const ability = this.findActivatedDirectionAbility()

        if (ability) {
            ability.trigger()
            return
        }
    }

    private activateDirectionAbility(ability: DirectionAbility) {
        Object.values(this.abilities[ActivationType.direction]).forEach((ab) => ab.deactivate())
        ability.activate()
    }

    private findActivatedDirectionAbility() {
        for (const ability of Object.values(this.abilities[ActivationType.direction])) {
            if (ability.isActivated) {
                return ability
            }
        }
        return false
    }

    private findAbilityByKey(abilityKey: AbilityKey): AbilityBase | false {
        for (const pair of Object.values(this.abilities)) {
            for (const [key, value] of Object.entries(pair)) {
                if (key === abilityKey) {
                    return value
                }
            }
        }
        return false
    }
}
