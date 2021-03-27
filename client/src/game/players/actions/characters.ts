import { Ability, basicAttack } from './abilities'
import { basicDown, basicLeft, basicRight, basicUp } from './movements'
import { ArrowKey, LocationType, AbilityKey } from '../../utils/types'

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
        [AbilityKey.Q]: Ability
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
            [AbilityKey.Q]: basicAttack,
        },
    } as CharacterTemplate,
}
