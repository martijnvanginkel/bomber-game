export interface LocationType {
    x: number
    y: number
}

export type Ability = AttackBlob[]

export interface AttackBlob {
    location: LocationType
    wait: number
    duration: number
}
