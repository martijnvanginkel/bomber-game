export enum AbilityStatus {
    ready,
    activated,
    inCooldown,
}

export enum ActivationType {
    instant,
    direction,
}

export interface AbilityBase {
    type: ActivationType
    isAvailable: boolean
    activate: () => void
    deactivate: () => void
}
