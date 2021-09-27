import { ArrowKey } from 'game/managers/InputController'

export enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

export enum ActivationType {
    instant = 'instant',
    direction = 'direction',
}

export interface InstantAbility extends AbilityBase {
    trigger: () => void
}

export interface DirectionAbility extends AbilityBase {
    activate: () => void
    deactivate: () => void
    trigger: (arrowKey: ArrowKey) => void
    isActivated: boolean
}

export interface AbilityBase {
    type: ActivationType
    reset: () => void
    // isAvailable: boolean
    // activate: () => void
    // deactivate: () => void
}
