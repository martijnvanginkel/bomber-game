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
    trigger: () => void
    isActivated: boolean
}

export interface AbilityBase {
    type: ActivationType
    // isAvailable: boolean
    // activate: () => void
    // deactivate: () => void
}
