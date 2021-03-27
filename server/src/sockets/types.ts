export interface ClientInfo {
    ID: string
    index: number
}

export interface ShareLocationType {
    oldLocation: LocationType
    newLocation: LocationType
    ID: string
    direction: Direction
}

interface LocationType {
    x: number
    y: number
}

export enum Direction {
    NORTH = 0,
    EAST = 90,
    SOUTH = 180,
    WEST = 270,
}

export interface BounceData {
    victimID: string
    incomingDirection: Direction
}

export type Ability = AttackBlob[]

export interface AttackBlob {
    location: LocationType
    wait: number
    duration: number
}
