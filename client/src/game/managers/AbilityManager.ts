import { TackleAbility2 } from '../players/abilities/TackleAbility2'
import { AbilityKey, ArrowKey } from './InputController'
import { AbilityBase, ActivationType } from '../players/abilities/AbilityBase'
import { DirectionAbility } from '../players/abilities/DirectionAbility'
import { InstantAbility } from '../players/abilities/InstantAbility'
import { SmashAbility } from '../players/abilities/SmashAbility'
import { MovementNode } from '../players/movement/MovementNode'
import { GameComInfo } from '../Game'

export class AbilityManager {
    private abilities: {
        [ActivationType.direction]: { [key: string]: DirectionAbility }
        [ActivationType.instant]: { [key: string]: InstantAbility }
    }
    private movementNode: MovementNode

    public constructor(info: GameComInfo) {
        this.abilities = {
            [ActivationType.direction]: {
                [AbilityKey.Q]: new TackleAbility2(AbilityKey.Q, info),
            },
            [ActivationType.instant]: {
                [AbilityKey.W]: new SmashAbility(AbilityKey.W, info),
            },
        }

        this.movementNode = new MovementNode(info)
    }

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
                ;(ability as InstantAbility).trigger()
            },
        }

        actions[ability.type]()
    }

    public handleArrowClick(arrowKey: ArrowKey) {
        const ability = this.findActivatedDirectionAbility()

        if (ability) {
            ability.fire(arrowKey)
            return
        }

        this.movementNode.move(arrowKey)
    }

    public resetAbilities() {
        for (const pair of Object.values(this.abilities)) {
            for (const ability of Object.values(pair)) {
                ;(ability as AbilityBase).reset()
            }
        }
    }

    private activateDirectionAbility(ability: DirectionAbility) {
        if (ability.isActivated) {
            ability.deactivate()
            return
        }

        Object.values(this.abilities[ActivationType.direction])
            .filter((ab) => ab.isActivated)
            .forEach((ab) => ab.deactivate())
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
