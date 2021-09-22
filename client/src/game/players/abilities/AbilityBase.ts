export enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

export enum ActivationType {
    instant,
    direction,
}

export interface InstantAbility {}

export interface DirectionAbility {}

export interface AbilityBase {
    type: ActivationType
    isAvailable: boolean
    activate: () => void
    deactivate: () => void
}
