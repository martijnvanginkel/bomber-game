export interface ShareLocationType {
    oldLocation: LocationType
    newLocation: LocationType
    ID: string
    direction: Direction
}

export interface LocationType {
    x: number
    y: number
}

export interface BounceData {
    victimID: string
    incomingDirection: Direction
}

export enum TileStatus {
    AVAILABLE,
    OCCUPIED,
    NONEXISTENT,
}

export enum Direction {
    NORTH = 0,
    EAST = 90,
    SOUTH = 180,
    WEST = 270,
}
