import { AbilityKey, ArrowKey } from '../../../utils/types'
import { characters, CharacterType } from '../characters'

export function findCharacterMove(key: ArrowKey, characterType: CharacterType) {
    return characters[characterType].moves[key]
}

export function findCharacterAbility(
    key: AbilityKey,
    characterType: CharacterType,
) {
    return characters[characterType].abilities[key]
}
