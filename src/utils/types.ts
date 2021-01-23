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

export enum ArrowKey {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export enum AbilityKey {
    Q = 'Q',
}

export enum Direction {
    NORTH = 0,
    EAST = 90,
    SOUTH = 180,
    WEST = 270,
}
