import { ArrowKey, AbilityKey } from '../../../managers/InputController'
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
