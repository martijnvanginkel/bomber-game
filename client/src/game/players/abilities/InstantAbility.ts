import { GameComInfo } from '../../Game'
import { AbilityKey } from '../../managers/InputController'
import { AbilityBase, ActivationType } from './AbilityBase'

export abstract class InstantAbility extends AbilityBase {

    protected constructor(protected abilityKey: AbilityKey, protected info: GameComInfo, protected cooldownTime: number) {
        super(abilityKey, info, cooldownTime, ActivationType.instant)
    }

    public trigger() {
        super.trigger()
    }
}
