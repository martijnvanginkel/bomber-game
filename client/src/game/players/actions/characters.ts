import { Ability, basicAttack } from './abilities'
import { basicDown, basicLeft, basicRight, basicUp } from './movements'
import { LocationType } from '../../utils/types'
import { ArrowKey, AbilityKey } from '../../../game/managers/InputController'

export enum CharacterType {
    BASIC = 'BASIC',
}

interface CharacterTemplate {
    moves: {
        [ArrowKey.UP]: LocationType
        [ArrowKey.DOWN]: LocationType
        [ArrowKey.LEFT]: LocationType
        [ArrowKey.RIGHT]: LocationType
    }
    abilities: {
        [AbilityKey.A]: Ability
    }
}

export const characters = {
    [CharacterType.BASIC]: {
        moves: {
            [ArrowKey.UP]: basicUp,
            [ArrowKey.DOWN]: basicDown,
            [ArrowKey.LEFT]: basicLeft,
            [ArrowKey.RIGHT]: basicRight,
        },
        abilities: {
            [AbilityKey.A]: basicAttack,
        },
    } as CharacterTemplate,
}
